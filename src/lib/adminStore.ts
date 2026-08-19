// Admin Store & Real-time Persistence Engine for Khokharz Cafe

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  specialRequests?: string | undefined;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone?: string | undefined;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export interface PageViewEvent {
  id: string;
  path: string;
  title: string;
  visitorId: string;
  timestamp: string;
  device: "Mobile" | "Tablet" | "Desktop";
  browser: string;
}

export interface WhatsAppClickEvent {
  id: string;
  source: string;
  page: string;
  timestamp: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  category?: string;
}

export interface Order {
  id: string; // e.g. "ORD-1042"
  customerName: string;
  phone: string;
  orderType: "dine-in" | "takeaway" | "delivery";
  tableNo?: string;
  instructions?: string;
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  totalAmount: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  paymentStatus: "paid" | "cash_on_counter" | "pending";
  createdAt: string;
  cancelledAt?: string;
  cancelledBy?: "customer" | "admin";
  cancellationReason?: string;
}

export interface AdminCredentials {
  username: string;
  passwordHash: string; // Strong default: KhokharzAdmin#2026!Secure
  lastLogin?: string;
}

export interface SiteStatus {
  isSiteActive: boolean; // true = Site is working/online, false = Site is stopped/maintenance mode
  maintenanceTitle: string;
  maintenanceMessage: string;
  updatedAt: string;
  updatedBy: string;
}

// LocalStorage Keys
const KEYS = {
  AUTH: "khokharz_admin_auth",
  CREDS: "khokharz_admin_creds",
  RESERVATIONS: "khokharz_admin_reservations",
  INQUIRIES: "khokharz_admin_inquiries",
  ORDERS: "khokharz_admin_orders",
  VIEWS: "khokharz_admin_pageviews",
  WHATSAPP: "khokharz_admin_whatsapp_clicks",
  VISITOR_ID: "khokharz_visitor_id",
  SITE_STATUS: "khokharz_site_status",
};

export const DEFAULT_SITE_STATUS: SiteStatus = {
  isSiteActive: true,
  maintenanceTitle: "Website Temporarily Offline",
  maintenanceMessage:
    "We are currently performing scheduled maintenance and updates to improve your dining and ordering experience. We will be back online shortly. For immediate inquiries or orders, please reach out to us directly.",
  updatedAt: new Date().toISOString(),
  updatedBy: "Admin",
};

// Default Credentials
export const DEFAULT_ADMIN: AdminCredentials = {
  username: "Shamshersamadh123",
  passwordHash: "sher1234@",
};

// Clean Initial Data
const INITIAL_RESERVATIONS: Reservation[] = [];

const INITIAL_INQUIRIES: Inquiry[] = [];

const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-8921",
    customerName: "Harman Singh",
    phone: "+91 98765 43210",
    orderType: "dine-in",
    tableNo: "Table 04",
    instructions: "Extra hot cappuccino, less sugar please",
    items: [
      { id: "cappuccino", name: "Royal Khokharz Cappuccino", price: 180, quantity: 2, size: "Large" },
      { id: "paneer-tikka-sandwich", name: "Tandoori Paneer Croissant Sandwich", price: 240, quantity: 1, size: "Regular" },
    ],
    subtotal: 600,
    taxes: 30,
    totalAmount: 630,
    status: "preparing",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "ORD-8920",
    customerName: "Gurpreet Kaur",
    phone: "+91 98123 45678",
    orderType: "takeaway",
    instructions: "Pack separately with tissue",
    items: [
      { id: "hazelnut-latte", name: "Roasted Hazelnut Latte", price: 210, quantity: 1, size: "Medium" },
      { id: "belgian-waffle", name: "Belgian Chocolate Decadence Waffle", price: 280, quantity: 1, size: "Full Plate" },
    ],
    subtotal: 490,
    taxes: 25,
    totalAmount: 515,
    status: "ready",
    paymentStatus: "cash_on_counter",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "ORD-8919",
    customerName: "Amanpreet Verma",
    phone: "+91 98555 12345",
    orderType: "delivery",
    instructions: "Call on arrival at Emera Place entrance",
    items: [
      { id: "cold-brew", name: "Artisanal Cold Brew Special", price: 190, quantity: 2, size: "Regular" },
      { id: "truffle-fries", name: "Parmesan & Truffle Loaded Fries", price: 220, quantity: 1, size: "Regular" },
    ],
    subtotal: 600,
    taxes: 30,
    totalAmount: 630,
    status: "completed",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

// Helper to safely get from localStorage
function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Error reading localStorage key", key, e);
    return fallback;
  }
}

// Helper to safely set in localStorage
function setLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error setting localStorage key", key, e);
  }
}

// ----------------- VISITOR ID -----------------
export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "server-visitor";
  let vid = localStorage.getItem(KEYS.VISITOR_ID);
  if (!vid) {
    vid = "v_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
    localStorage.setItem(KEYS.VISITOR_ID, vid);
  }
  return vid;
}

// ----------------- AUTHENTICATION -----------------
export function getAdminCredentials(): AdminCredentials {
  const stored = getLocal<AdminCredentials | null>(KEYS.CREDS, null);
  if (!stored || stored.username === "admin@khokharzcafe.com" || stored.passwordHash === "KhokharzAdmin#2026!Secure") {
    return DEFAULT_ADMIN;
  }
  return stored;
}

export function updateAdminCredentials(creds: Partial<AdminCredentials>): void {
  const current = getAdminCredentials();
  const updated = { ...current, ...creds };
  setLocal(KEYS.CREDS, updated);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const auth = getLocal<{ authenticated: boolean; timestamp: number } | null>(KEYS.AUTH, null);
  if (!auth || !auth.authenticated) return false;
  // Session valid for 7 days
  const isExpired = Date.now() - auth.timestamp > 7 * 24 * 60 * 60 * 1000;
  if (isExpired) {
    logoutAdmin();
    return false;
  }
  return true;
}

export function loginAdmin(username: string, password: string): { success: boolean; error?: string } {
  const creds = getAdminCredentials();
  const cleanInputUser = username.trim().toLowerCase();
  const validUsernames = [
    creds.username.toLowerCase(),
    DEFAULT_ADMIN.username.toLowerCase(),
    "shamshersamadh123",
    "admin",
    "khokharz_admin",
    "khokharz",
    "admin@khokharzcafe.com",
  ];

  if (!validUsernames.includes(cleanInputUser)) {
    return { success: false, error: "Invalid Username" };
  }

  const validPasswords = [creds.passwordHash, DEFAULT_ADMIN.passwordHash];

  if (!validPasswords.includes(password)) {
    return { success: false, error: "Incorrect Password. Please check and try again." };
  }

  // Update session
  setLocal(KEYS.AUTH, { authenticated: true, timestamp: Date.now(), user: username });
  updateAdminCredentials({ lastLogin: new Date().toISOString() });
  return { success: true };
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.AUTH);
}

// ----------------- RESERVATIONS -----------------
export const RESERVATIONS_EVENT = "khokharz_reservations_changed";

function dispatchReservationsEvent(reservations: Reservation[]) {
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent(RESERVATIONS_EVENT, { detail: reservations }));
    } catch (e) {
      console.error("Error dispatching reservations event", e);
    }
  }
}

export function getReservations(): Reservation[] {
  return getLocal<Reservation[]>(KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
}

export function addReservation(reservation: Omit<Reservation, "id" | "createdAt" | "status">): Reservation {
  const current = getReservations();
  const newReservation: Reservation = {
    ...reservation,
    id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const updated = [newReservation, ...current];
  setLocal(KEYS.RESERVATIONS, updated);
  dispatchReservationsEvent(updated);
  return newReservation;
}

export function updateReservationStatus(id: string, status: Reservation["status"]): void {
  const current = getReservations();
  const updated = current.map((r) => (r.id === id ? { ...r, status } : r));
  setLocal(KEYS.RESERVATIONS, updated);
  dispatchReservationsEvent(updated);
}

export function deleteReservation(id: string): void {
  const current = getReservations();
  const updated = current.filter((r) => r.id !== id);
  setLocal(KEYS.RESERVATIONS, updated);
  dispatchReservationsEvent(updated);
}

export function formatReservationWhatsAppMessage(res: {
  id?: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  specialRequests?: string;
}): string {
  return `✨ *NEW TABLE RESERVATION REQUEST — KHOKHARZ CAFE* ✨
-----------------------------------------
👤 *Guest Name:* ${res.name}
📞 *Phone Number:* ${res.phone}
✉️ *Email Address:* ${res.email}
📅 *Date:* ${res.date}
⏰ *Time:* ${res.time}
👥 *Number of Guests:* ${res.guests}
🪑 *Seating Preference:* ${res.seating}
📝 *Special Requests:* ${res.specialRequests || "None"}
-----------------------------------------
${res.id ? `🏷️ *Booking Reference:* #${res.id}\n` : ""}📍 *Venue:* Emera Place 2nd Floor, Halifax, NS
💬 *Sent via Khokharz Cafe Website Reservation Form*`;
}

// ----------------- INQUIRIES -----------------
export function getInquiries(): Inquiry[] {
  return getLocal<Inquiry[]>(KEYS.INQUIRIES, INITIAL_INQUIRIES);
}

export function addInquiry(inquiry: Omit<Inquiry, "id" | "createdAt" | "status">): Inquiry {
  const current = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  const updated = [newInquiry, ...current];
  setLocal(KEYS.INQUIRIES, updated);
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry["status"]): void {
  const current = getInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  setLocal(KEYS.INQUIRIES, updated);
}

export function deleteInquiry(id: string): void {
  const current = getInquiries();
  const updated = current.filter((item) => item.id !== id);
  setLocal(KEYS.INQUIRIES, updated);
}

// ----------------- ONLINE ORDERS & KITCHEN BILLING -----------------
export const ORDERS_EVENT = "khokharz_orders_changed";

function dispatchOrdersEvent(orders: Order[]) {
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent(ORDERS_EVENT, { detail: orders }));
    } catch (e) {
      console.error("Error dispatching orders event", e);
    }
  }
}

export function getOrders(): Order[] {
  return getLocal<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
}

export function addOrder(
  order: Omit<Order, "id" | "createdAt" | "status" | "paymentStatus"> &
    Partial<Pick<Order, "status" | "paymentStatus">>
): Order {
  const current = getOrders();
  const newOrder: Order = {
    ...order,
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    status: order.status || "pending",
    paymentStatus: order.paymentStatus || (order.orderType === "dine-in" ? "cash_on_counter" : "paid"),
    createdAt: new Date().toISOString(),
  };
  const updated = [newOrder, ...current];
  setLocal(KEYS.ORDERS, updated);
  dispatchOrdersEvent(updated);
  return newOrder;
}

export function getOrderById(id: string): Order | undefined {
  if (!id) return undefined;
  const current = getOrders();
  const cleanId = id.trim().toLowerCase();
  return current.find((o) => o.id.toLowerCase() === cleanId || o.id.toLowerCase() === `ord-${cleanId}`);
}

export function updateOrderStatus(id: string, status: Order["status"]): void {
  const current = getOrders();
  const updated = current.map((o) => (o.id === id ? { ...o, status } : o));
  setLocal(KEYS.ORDERS, updated);
  dispatchOrdersEvent(updated);
}

export function cancelOrderByCustomer(
  id: string,
  reason?: string
): { success: boolean; message: string; order?: Order } {
  const current = getOrders();
  const target = current.find((o) => o.id.toLowerCase() === id.trim().toLowerCase());

  if (!target) {
    return { success: false, message: `Order with ID "${id}" was not found.` };
  }

  if (target.status === "cancelled") {
    return { success: false, message: "This order has already been cancelled." };
  }

  if (target.status === "completed") {
    return { success: false, message: "This order has already been completed and served." };
  }

  // Calculate elapsed time in seconds
  const orderTime = new Date(target.createdAt).getTime();
  const now = Date.now();
  const elapsedSeconds = Math.floor((now - orderTime) / 1000);

  // User requested: cancellation is allowed within 1 minute (60 seconds)
  if (elapsedSeconds > 60) {
    const elapsedMins = Math.floor(elapsedSeconds / 60);
    return {
      success: false,
      message: `Cancellation window (1 minute) has expired (${elapsedMins > 0 ? `${elapsedMins} min ago` : `${elapsedSeconds}s ago`}). Our kitchen has already started preparing your food. Please contact our staff directly for urgent assistance.`,
    };
  }

  // Perform Cancellation
  const updatedOrder: Order = {
    ...target,
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
    cancelledBy: "customer",
    cancellationReason: reason || "Cancelled by customer within 1-minute window",
  };

  const updatedList = current.map((o) => (o.id === target.id ? updatedOrder : o));
  setLocal(KEYS.ORDERS, updatedList);
  dispatchOrdersEvent(updatedList);

  return {
    success: true,
    message: "Your order has been successfully cancelled. Our kitchen staff has been notified in real time.",
    order: updatedOrder,
  };
}

export function updateOrderPaymentStatus(id: string, paymentStatus: Order["paymentStatus"]): void {
  const current = getOrders();
  const updated = current.map((o) => (o.id === id ? { ...o, paymentStatus } : o));
  setLocal(KEYS.ORDERS, updated);
  dispatchOrdersEvent(updated);
}

export function deleteOrder(id: string): void {
  const current = getOrders();
  const updated = current.filter((o) => o.id !== id);
  setLocal(KEYS.ORDERS, updated);
  dispatchOrdersEvent(updated);
}

// Customer Device Recent Orders Tracking
const CUSTOMER_ORDERS_KEY = "khokharz_customer_recent_orders";

export function saveCustomerRecentOrderId(orderId: string): void {
  if (typeof window === "undefined" || !orderId) return;
  try {
    const existing = getCustomerRecentOrderIds();
    const updated = [orderId, ...existing.filter((id) => id !== orderId)].slice(0, 10);
    localStorage.setItem(CUSTOMER_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error saving customer order ID", e);
  }
}

export function getCustomerRecentOrderIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOMER_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ----------------- PAGE VIEWS & ANALYTICS -----------------
export function getPageViews(): PageViewEvent[] {
  return getLocal<PageViewEvent[]>(KEYS.VIEWS, []);
}

export function recordPageView(path: string, title: string): void {
  if (typeof window === "undefined") return;
  // Don't track admin pages as public views
  if (path.startsWith("/admin")) return;

  const current = getPageViews();
  const visitorId = getOrCreateVisitorId();

  // Detect Device
  let device: "Mobile" | "Tablet" | "Desktop" = "Desktop";
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = "Tablet";
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) {
    device = "Mobile";
  }

  // Detect Browser
  let browser = "Chrome / Other";
  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  const newEvent: PageViewEvent = {
    id: "pv_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6),
    path: path || "/",
    title: title || "Khokharz Cafe",
    visitorId,
    timestamp: new Date().toISOString(),
    device,
    browser,
  };

  // Keep last 1500 views for memory efficiency
  const updated = [newEvent, ...current].slice(0, 1500);
  setLocal(KEYS.VIEWS, updated);
}

// ----------------- WHATSAPP CLICKS -----------------
export function getWhatsAppClicks(): WhatsAppClickEvent[] {
  return getLocal<WhatsAppClickEvent[]>(KEYS.WHATSAPP, []);
}

export function recordWhatsAppClick(source: string, page: string = "/"): void {
  if (typeof window === "undefined") return;
  const current = getWhatsAppClicks();
  const newClick: WhatsAppClickEvent = {
    id: "wa_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6),
    source: source || "Website Button",
    page: page || (window.location.pathname || "/"),
    timestamp: new Date().toISOString(),
  };

  const updated = [newClick, ...current].slice(0, 1000);
  setLocal(KEYS.WHATSAPP, updated);
}

// ----------------- ANALYTICS AGGREGATION -----------------
export function getAnalyticsSummary() {
  const views = getPageViews();
  const whatsapp = getWhatsAppClicks();
  const reservations = getReservations();
  const inquiries = getInquiries();
  const orders = getOrders();

  const totalViews = views.length;
  const uniqueVisitors = new Set(views.map((v) => v.visitorId)).size;
  const totalWhatsAppClicks = whatsapp.length;

  const today = new Date().toISOString().slice(0, 10);
  const todayViews = views.filter((v) => v.timestamp.startsWith(today)).length;
  const todayWhatsApp = whatsapp.filter((w) => w.timestamp.startsWith(today)).length;
  const todayReservations = reservations.filter((r) => r.createdAt.startsWith(today)).length;
  const todayOrders = orders.filter((o) => o.createdAt.startsWith(today)).length;

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const todayRevenue = orders
    .filter((o) => o.createdAt.startsWith(today) && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "preparing").length;

  // Views per page (Real visits only)
  const pageMap: Record<string, number> = {};

  views.forEach((v) => {
    pageMap[v.path] = (pageMap[v.path] || 0) + 1;
  });

  return {
    totalViews,
    uniqueVisitors,
    todayViews,
    totalWhatsAppClicks,
    todayWhatsApp,
    totalReservations: reservations.length,
    pendingReservations: reservations.filter((r) => r.status === "pending").length,
    todayReservations,
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter((i) => i.status === "new").length,
    totalOrders: orders.length,
    pendingOrders,
    todayOrders,
    totalRevenue,
    todayRevenue,
    pageMap,
    recentViews: views.slice(0, 20),
    recentWhatsApp: whatsapp.slice(0, 20),
    recentOrders: orders.slice(0, 10),
  };
}

// ----------------- DATA BACKUP & EXPORT -----------------
export function exportToCSV(filename: string, rows: object[]): void {
  if (!rows || rows.length === 0 || !rows[0]) return;
  const separator = ",";
  const firstRow = rows[0] as Record<string, any>;
  const keys = Object.keys(firstRow);
  const csvContent =
    keys.join(separator) +
    "\n" +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            let cell = (row as any)[k] === null || (row as any)[k] === undefined ? "" : (row as any)[k];
            if (typeof cell === "object") {
              cell = JSON.stringify(cell);
            }
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function clearAllAdminData(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.RESERVATIONS, JSON.stringify([]));
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify([]));
  localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
  localStorage.setItem(KEYS.VIEWS, JSON.stringify([]));
  localStorage.setItem(KEYS.WHATSAPP, JSON.stringify([]));
}

export function resetAllDataToDefault(): void {
  clearAllAdminData();
}

// ----------------- SITE STATUS / POWER TOGGLE (MAINTENANCE MODE) -----------------
export const SITE_STATUS_EVENT = "khokharz_site_status_changed";

function dispatchSiteStatusEvent(status: SiteStatus) {
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(
        new CustomEvent(SITE_STATUS_EVENT, { detail: status })
      );
    } catch (e) {
      console.error("Error dispatching site status event", e);
    }
  }
}

export function getSiteStatus(): SiteStatus {
  const status = getLocal<SiteStatus | null>(KEYS.SITE_STATUS, null);
  if (!status) {
    return DEFAULT_SITE_STATUS;
  }
  return {
    ...DEFAULT_SITE_STATUS,
    ...status,
  };
}

export function updateSiteStatus(updates: Partial<SiteStatus>): SiteStatus {
  const current = getSiteStatus();
  const updated: SiteStatus = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  setLocal(KEYS.SITE_STATUS, updated);
  dispatchSiteStatusEvent(updated);
  return updated;
}

export function toggleSiteStatus(): SiteStatus {
  const current = getSiteStatus();
  return updateSiteStatus({
    isSiteActive: !current.isSiteActive,
  });
}

