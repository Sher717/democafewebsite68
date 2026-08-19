import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { CartProvider } from "../context/CartContext";
import { CartDrawer } from "../components/site/CartDrawer";
import { FloatingCartButton } from "../components/site/FloatingCartButton";
import { QuickContactWidget } from "../components/site/QuickContactWidget";
import { trackPageView } from "../lib/analytics";
import { MaintenanceView } from "../components/site/MaintenanceView";
import { getSiteStatus, SITE_STATUS_EVENT, type SiteStatus } from "../lib/adminStore";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Khokharz Cafe — Coffee, Breakfast & Lunch in Halifax" },
      {
        name: "description",
        content:
          "Khokharz Cafe at Emera Place, Halifax — coffee, breakfast and lunch, dine-in or takeaway.",
      },
      { property: "og:site_name", content: "Khokharz Cafe" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Great+Vibes&family=DM+Sans:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [siteStatus, setSiteStatus] = useState<SiteStatus>(() => getSiteStatus());

  useEffect(() => {
    // Listen for cross-tab and in-window status changes
    const handleStatusChange = (e?: Event) => {
      const customEvent = e as CustomEvent<SiteStatus> | undefined;
      if (customEvent?.detail) {
        setSiteStatus(customEvent.detail);
      } else {
        setSiteStatus(getSiteStatus());
      }
    };

    window.addEventListener("storage", handleStatusChange);
    window.addEventListener(SITE_STATUS_EVENT, handleStatusChange);

    return () => {
      window.removeEventListener("storage", handleStatusChange);
      window.removeEventListener(SITE_STATUS_EVENT, handleStatusChange);
    };
  }, []);

  useEffect(() => {
    if (!isAdmin && siteStatus.isSiteActive) {
      trackPageView(location.pathname);
    }
  }, [location.pathname, isAdmin, siteStatus.isSiteActive]);

  // If site is disabled/offline and visitor is NOT on /admin, display Maintenance Page
  const isMaintenanceActive = !isAdmin && !siteStatus.isSiteActive;

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {isMaintenanceActive ? (
          <MaintenanceView status={siteStatus} />
        ) : (
          <div className="flex min-h-dvh flex-col overflow-x-hidden">
            {!isAdmin && <SiteHeader />}
            <main className="flex-1">
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </main>
            {!isAdmin && <SiteFooter />}
            {!isAdmin && <CartDrawer />}
            {!isAdmin && <FloatingCartButton />}
            {!isAdmin && <QuickContactWidget />}
          </div>
        )}
      </CartProvider>
    </QueryClientProvider>
  );
}

