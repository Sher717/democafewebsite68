import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  Calendar,
  Users,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Trash2,
  Sparkles,
  RefreshCw,
  KeyRound,
  ExternalLink,
  ChevronRight,
  PlusCircle,
  Check,
  Info,
  Smartphone,
  Monitor,
  Globe,
  Settings,
  Power,
  PowerOff,
  Radio,
  Activity,
  ShieldAlert,
  ShoppingBag,
  ChefHat,
  Receipt,
  UtensilsCrossed,
  CreditCard,
  Printer,
  DollarSign,
  Package,
} from "lucide-react";
import { Container } from "@/components/site/Section";
import {
  DEFAULT_ADMIN,
  getAdminCredentials,
  updateAdminCredentials,
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  getReservations,
  updateReservationStatus,
  deleteReservation,
  addReservation,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getOrders,
  addOrder,
  updateOrderStatus,
  updateOrderPaymentStatus,
  deleteOrder,
  ORDERS_EVENT,
  RESERVATIONS_EVENT,
  getAnalyticsSummary,
  exportToCSV,
  clearAllAdminData,
  resetAllDataToDefault,
  getSiteStatus,
  updateSiteStatus,
  toggleSiteStatus,
  SITE_STATUS_EVENT,
  type Reservation,
  type Inquiry,
  type Order,
  type OrderItem,
  type SiteStatus,
} from "@/lib/adminStore";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Khokharz Cafe Management & Analytics" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Login Form State
  const [loginUser, setLoginUser] = useState("Shamshersamadh123");
  const [loginPass, setLoginPass] = useState("sher1234@");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "reservations" | "inquiries" | "whatsapp" | "traffic" | "settings"
  >("overview");

  // Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [analytics, setAnalytics] = useState<ReturnType<typeof getAnalyticsSummary> | null>(null);

  // Orders Filters & Modals
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<
    "all" | "pending" | "preparing" | "ready" | "completed" | "cancelled"
  >("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<"all" | "dine-in" | "takeaway" | "delivery">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    customerName: "",
    phone: "",
    orderType: "dine-in" as "dine-in" | "takeaway" | "delivery",
    tableNo: "Table 01",
    itemName: "Royal Khokharz Cappuccino",
    itemPrice: 180,
    itemQty: 1,
    instructions: "",
  });

  // Reservation Filters & Search
  const [resSearch, setResSearch] = useState("");
  const [resFilter, setResFilter] = useState<"all" | "pending" | "confirmed" | "cancelled" | "completed">("all");

  // Inquiries Search & Filter
  const [inqSearch, setInqSearch] = useState("");
  const [inqFilter, setInqFilter] = useState<"all" | "new" | "read" | "replied">("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Manual Add Reservation Modal State
  const [showAddResModal, setShowAddResModal] = useState(false);
  const [newResData, setNewResData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "Today",
    time: "07:00 PM",
    guests: "2 People",
    seating: "Main Dining",
    specialRequests: "",
  });

  // Settings State
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [settingsError, setSettingsError] = useState("");

  // Site Power & Maintenance Mode State
  const [siteStatus, setSiteStatus] = useState<SiteStatus>(() => getSiteStatus());
  const [maintTitleInput, setMaintTitleInput] = useState(siteStatus.maintenanceTitle);
  const [maintMsgInput, setMaintMsgInput] = useState(siteStatus.maintenanceMessage);
  const [siteToast, setSiteToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Refresh & Load Data
  const refreshData = () => {
    setOrders(getOrders());
    setReservations(getReservations());
    setInquiries(getInquiries());
    setAnalytics(getAnalyticsSummary());
    const currentStatus = getSiteStatus();
    setSiteStatus(currentStatus);
    setMaintTitleInput(currentStatus.maintenanceTitle);
    setMaintMsgInput(currentStatus.maintenanceMessage);
  };

  useEffect(() => {
    const authStatus = isAdminAuthenticated();
    setIsAuthenticated(authStatus);
    setIsCheckingAuth(false);
    if (authStatus) {
      refreshData();
    }

    // Real-time synchronization
    const handleStatusSync = (e?: Event) => {
      const customEvent = e as CustomEvent<SiteStatus> | undefined;
      const s = customEvent?.detail || getSiteStatus();
      setSiteStatus(s);
      setMaintTitleInput(s.maintenanceTitle);
      setMaintMsgInput(s.maintenanceMessage);
    };

    const handleOrdersSync = (e?: Event) => {
      const customEvent = e as CustomEvent<Order[]> | undefined;
      const ords = customEvent?.detail || getOrders();
      setOrders(ords);
      setAnalytics(getAnalyticsSummary());
    };

    const handleReservationsSync = (e?: Event) => {
      const customEvent = e as CustomEvent<Reservation[]> | undefined;
      const res = customEvent?.detail || getReservations();
      setReservations(res);
      setAnalytics(getAnalyticsSummary());
    };

    window.addEventListener("storage", handleStatusSync);
    window.addEventListener("storage", handleOrdersSync);
    window.addEventListener("storage", handleReservationsSync);
    window.addEventListener(SITE_STATUS_EVENT, handleStatusSync);
    window.addEventListener(ORDERS_EVENT, handleOrdersSync);
    window.addEventListener(RESERVATIONS_EVENT, handleReservationsSync);

    return () => {
      window.removeEventListener("storage", handleStatusSync);
      window.removeEventListener("storage", handleOrdersSync);
      window.removeEventListener("storage", handleReservationsSync);
      window.removeEventListener(SITE_STATUS_EVENT, handleStatusSync);
      window.removeEventListener(ORDERS_EVENT, handleOrdersSync);
      window.removeEventListener(RESERVATIONS_EVENT, handleReservationsSync);
    };
  }, []);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    setTimeout(() => {
      const res = loginAdmin(loginUser, loginPass);
      if (res.success) {
        setIsAuthenticated(true);
        refreshData();
      } else {
        setLoginError(res.error || "Authentication failed. Please check credentials.");
      }
      setLoginLoading(false);
    }, 400);
  };

  // Handle Logout
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  // Quick fill credentials for demo
  const fillDemoCreds = () => {
    const creds = getAdminCredentials();
    setLoginUser(creds.username);
    setLoginPass(creds.passwordHash);
    setLoginError("");
  };

  // Handle Status Update for Reservation
  const handleResStatusChange = (id: string, status: Reservation["status"]) => {
    updateReservationStatus(id, status);
    refreshData();
  };

  // Handle Delete Reservation
  const handleDeleteRes = (id: string) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      deleteReservation(id);
      refreshData();
    }
  };

  // Handle Status Update for Inquiry
  const handleInqStatusChange = (id: string, status: Inquiry["status"]) => {
    updateInquiryStatus(id, status);
    refreshData();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  // Handle Delete Inquiry
  const handleDeleteInq = (id: string) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      deleteInquiry(id);
      refreshData();
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  // Handle Clear All Data
  const handleClearAllData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear ALL data in the admin panel? All table bookings, messages, views, and WhatsApp clicks will be wiped to 0.",
      )
    ) {
      clearAllAdminData();
      refreshData();
      alert("All Admin Data cleared successfully! Reset to 0.");
    }
  };

  // Handle Manual Add Reservation
  const handleCreateManualReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResData.name || !newResData.phone) {
      alert("Name and phone number are required.");
      return;
    }
    addReservation(newResData);
    refreshData();
    setShowAddResModal(false);
    setNewResData({
      name: "",
      phone: "",
      email: "",
      date: "Today",
      time: "07:00 PM",
      guests: "2 People",
      seating: "Main Dining",
      specialRequests: "",
    });
  };

  // Handle Update Credentials
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSuccess("");

    if (newPassword && newPassword.length < 8) {
      setSettingsError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setSettingsError("Passwords do not match.");
      return;
    }

    const updates: any = {};
    if (newUsername.trim()) updates.username = newUsername.trim();
    if (newPassword) updates.passwordHash = newPassword;

    if (Object.keys(updates).length === 0) {
      setSettingsError("No changes specified.");
      return;
    }

    updateAdminCredentials(updates);
    setSettingsSuccess("Admin credentials updated successfully!");
    setNewUsername("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handle Toggle Website ON / OFF (Maintenance Mode)
  const handleToggleSiteStatus = () => {
    const willBeActive = !siteStatus.isSiteActive;
    const confirmMessage = willBeActive
      ? "Turn Website ON? Public customers will be able to browse menu, book tables, and view all pages normally."
      : "Turn Website OFF? Public visitors will be redirected to the luxury 'Maintenance Mode' screen. You (Admin) will always have full access to /admin to turn it back on at any time.";

    if (window.confirm(confirmMessage)) {
      const updated = toggleSiteStatus();
      setSiteStatus(updated);
      setSiteToast({
        message: updated.isSiteActive
          ? "🟢 Website is now LIVE & ACTIVE for all visitors!"
          : "🔴 Website is now PAUSED (Maintenance Mode is Active for public visitors).",
        type: updated.isSiteActive ? "success" : "info",
      });
      setTimeout(() => setSiteToast(null), 5000);
    }
  };

  // Handle Save Maintenance Custom Notice
  const handleSaveMaintenanceSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateSiteStatus({
      maintenanceTitle: maintTitleInput.trim() || "Website Temporarily Offline",
      maintenanceMessage:
        maintMsgInput.trim() ||
        "We are currently performing scheduled maintenance to upgrade your dining and online experience. We will be back online shortly!",
    });
    setSiteStatus(updated);
    setSettingsSuccess("Website maintenance title and message updated successfully!");
    setSiteToast({
      message: "Maintenance notice settings updated successfully!",
      type: "success",
    });
    setTimeout(() => {
      setSettingsSuccess("");
      setSiteToast(null);
    }, 4000);
  };

  // Handle Order Status Changes
  const handleOrderStatusChange = (id: string, status: Order["status"]) => {
    updateOrderStatus(id, status);
    refreshData();
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  // Handle Order Payment Status Change
  const handleOrderPaymentChange = (id: string, paymentStatus: Order["paymentStatus"]) => {
    updateOrderPaymentStatus(id, paymentStatus);
    refreshData();
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, paymentStatus });
    }
  };

  // Handle Delete Order
  const handleDeleteOrder = (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(id);
      refreshData();
      if (selectedOrder?.id === id) setSelectedOrder(null);
    }
  };

  // Handle Manual Add Counter Order
  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderData.customerName || !newOrderData.itemName) {
      alert("Customer name and item name are required.");
      return;
    }

    const itemTotal = Number(newOrderData.itemPrice) * Number(newOrderData.itemQty);
    const subtotal = itemTotal;
    const taxes = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + taxes;

    addOrder({
      customerName: newOrderData.customerName,
      phone: newOrderData.phone || "Counter Order",
      orderType: newOrderData.orderType,
      tableNo: newOrderData.orderType === "dine-in" ? newOrderData.tableNo : undefined,
      instructions: newOrderData.instructions || undefined,
      items: [
        {
          id: "item-" + Date.now(),
          name: newOrderData.itemName,
          price: Number(newOrderData.itemPrice),
          quantity: Number(newOrderData.itemQty),
          size: "Regular",
        },
      ],
      subtotal,
      taxes,
      totalAmount,
      status: "pending",
      paymentStatus: newOrderData.orderType === "dine-in" ? "cash_on_counter" : "paid",
    });

    refreshData();
    setShowAddOrderModal(false);
    setNewOrderData({
      customerName: "",
      phone: "",
      orderType: "dine-in",
      tableNo: "Table 01",
      itemName: "Royal Khokharz Cappuccino",
      itemPrice: 180,
      itemQty: 1,
      instructions: "",
    });
  };

  // Filtered lists
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    const matchesType = orderTypeFilter === "all" || o.orderType === orderTypeFilter;
    const q = orderSearch.toLowerCase();
    const matchesSearch =
      !q ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      (o.tableNo && o.tableNo.toLowerCase().includes(q)) ||
      o.items.some((item) => item.name.toLowerCase().includes(q));
    return matchesStatus && matchesType && matchesSearch;
  });

  const filteredReservations = reservations.filter((r) => {
    const matchesFilter = resFilter === "all" || r.status === resFilter;
    const q = resSearch.toLowerCase();
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = inqFilter === "all" || inq.status === inqFilter;
    const q = inqSearch.toLowerCase();
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.subject.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090806] text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-[#e2c569]" />
          <p className="font-cinzel text-sm text-[#e2c569]">Loading Khokharz Admin Portal...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 1. LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070605] py-16 px-4 text-white flex items-center justify-center relative overflow-hidden">
        {/* Background glow & luxury accents */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#e2c569]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md rounded-3xl border border-[#e2c569]/40 bg-gradient-to-b from-[#16130c] via-[#100d08] to-[#090806] p-8 shadow-[0_0_60px_rgba(226,197,105,0.2)] animate-in fade-in-50 duration-500">
          {/* Top Bar Metallic Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e2c569] to-transparent rounded-t-3xl" />

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e2c569]/50 bg-[#e2c569]/15 text-[#e2c569] shadow-[0_0_25px_rgba(226,197,105,0.3)]">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <h1 className="mt-4 font-cinzel text-2xl font-bold tracking-widest text-[#e2c569]">
              KHOKHARZ CAFE
            </h1>
            <p className="font-cinzel text-xs tracking-wider text-neutral-400 mt-1">
              SECURE ADMIN MANAGEMENT PORTAL
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300 animate-in shake duration-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
            {/* Username / Email */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-cinzel tracking-wider">
                ADMIN USERNAME
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  required
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="Shamshersamadh123"
                  className="w-full rounded-xl border border-[#e2c569]/30 bg-neutral-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none focus:ring-1 focus:ring-[#e2c569]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-cinzel tracking-wider">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-[#e2c569]/30 bg-neutral-950/80 py-2.5 pl-10 pr-10 text-sm text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none focus:ring-1 focus:ring-[#e2c569]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-500 hover:text-[#e2c569] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginLoading}
              className="mt-2 w-full rounded-xl border border-[#e2c569] bg-gradient-to-r from-[#e2c569] to-[#c5a342] py-3 text-xs font-cinzel font-bold tracking-widest text-black shadow-[0_0_25px_rgba(226,197,105,0.3)] transition-all hover:brightness-110 hover:shadow-[0_0_35px_rgba(226,197,105,0.5)] active:scale-[0.99] disabled:opacity-50"
            >
              {loginLoading ? "VERIFYING CREDENTIALS..." : "ACCESS ADMIN DASHBOARD"}
            </button>
          </form>

          {/* Demo Credentials Quick Fill Badge */}
          <div className="mt-6 rounded-2xl border border-[#e2c569]/20 bg-black/60 p-4 text-center">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-cinzel text-[11px] text-[#e2c569] font-bold">🔐 YOUR ADMIN CREDENTIALS:</span>
              <button
                type="button"
                onClick={fillDemoCreds}
                className="text-[11px] text-[#e2c569] underline hover:text-amber-300 font-semibold cursor-pointer"
              >
                Auto Fill
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-neutral-300 font-mono text-left">
              User: <span className="text-[#e2c569]">Shamshersamadh123</span>
            </p>
            <p className="text-[11px] text-neutral-300 font-mono text-left">
              Pass: <span className="text-[#e2c569]">sher1234@</span>
            </p>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-neutral-400 hover:text-[#e2c569] transition-colors inline-flex items-center gap-1 font-cinzel"
            >
              ← Back to Main Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const summary = analytics || getAnalyticsSummary();

  return (
    <div className="min-h-screen bg-[#070605] text-white">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 border-b border-[#e2c569]/20 bg-[#0c0a07]/95 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2c569]/50 bg-[#e2c569]/15 text-[#e2c569] shadow-[0_0_15px_rgba(226,197,105,0.3)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-base font-bold tracking-wider text-[#e2c569]">
                  KHOKHARZ CAFE
                </span>
                <span className="rounded bg-[#e2c569]/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#e2c569] border border-[#e2c569]/30">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 hidden sm:block">
                Live Visitor Tracking, Bookings & Inquiries Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Master Website Power Toggle Button (Kill Switch) */}
            <button
              onClick={handleToggleSiteStatus}
              title={
                siteStatus.isSiteActive
                  ? "Click to TURN OFF Website (Activate Maintenance Mode)"
                  : "Click to TURN ON Website (Restore Normal Live Site)"
              }
              className={`flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-cinzel font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                siteStatus.isSiteActive
                  ? "border-emerald-500/50 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/80 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                  : "border-red-500/60 bg-red-950/70 text-red-300 hover:bg-red-900/90 hover:border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.35)] animate-pulse"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                    siteStatus.isSiteActive ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                    siteStatus.isSiteActive ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
              </span>
              <span className="hidden sm:inline font-bold tracking-wider">
                {siteStatus.isSiteActive ? "SITE: LIVE / ON" : "SITE: OFFLINE / OFF"}
              </span>
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase ${
                  siteStatus.isSiteActive
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-red-500/30 text-red-200 border border-red-500/40"
                }`}
              >
                {siteStatus.isSiteActive ? "ONLINE" : "OFFLINE"}
              </span>
            </button>

            <button
              onClick={handleClearAllData}
              title="Clear all stored data and reset to 0"
              className="flex h-8 items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 px-2.5 text-xs font-semibold text-red-300 hover:bg-red-500 hover:text-white transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Clear Data</span>
            </button>

            <button
              onClick={refreshData}
              title="Refresh Live Data"
              className="flex h-8 items-center gap-1.5 rounded-lg border border-[#e2c569]/30 bg-neutral-900 px-2.5 text-xs text-[#e2c569] hover:bg-[#e2c569] hover:text-black transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Refresh</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <Globe className="h-3.5 w-3.5 text-[#e2c569]" />
              <span className="hidden sm:inline">View Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </Container>
      </header>

      {/* Floating Status Notification Toast */}
      {siteToast && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 duration-300">
          <div
            className={`flex items-center gap-3 rounded-2xl border p-4 text-xs font-semibold shadow-2xl backdrop-blur-md ${
              siteToast.type === "success"
                ? "border-emerald-500/50 bg-emerald-950/90 text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                : "border-amber-500/50 bg-amber-950/90 text-amber-200 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            }`}
          >
            <Sparkles className="h-5 w-5 shrink-0" />
            <span>{siteToast.message}</span>
            <button
              onClick={() => setSiteToast(null)}
              className="ml-2 text-xs opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <Container className="py-8">
        {/* Navigation Tabs Strip */}
        <div className="flex flex-wrap gap-2 border-b border-[#e2c569]/20 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === "overview"
                ? "border border-[#e2c569] bg-[#e2c569] text-black shadow-[0_0_15px_rgba(226,197,105,0.3)]"
                : "border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-[#e2c569]/40 hover:text-white"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>OVERVIEW & STATS</span>
          </button>

          {/* ONLINE & TABLE ORDERS TAB */}
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === "orders"
                ? "border border-[#e2c569] bg-[#e2c569] text-black shadow-[0_0_15px_rgba(226,197,105,0.3)]"
                : "border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-[#e2c569]/40 hover:text-white"
            }`}
          >
            <ShoppingBag className="h-4 w-4 text-amber-400" />
            <span>ONLINE & TABLE ORDERS</span>
            {orders.filter((o) => o.status === "pending" || o.status === "preparing").length > 0 && (
              <span className="ml-1 rounded-full bg-emerald-500 px-1.5 py-0.2 text-[10px] font-bold text-black animate-pulse">
                {orders.filter((o) => o.status === "pending" || o.status === "preparing").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("reservations")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === "reservations"
                ? "border border-[#e2c569] bg-[#e2c569] text-black shadow-[0_0_15px_rgba(226,197,105,0.3)]"
                : "border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-[#e2c569]/40 hover:text-white"
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>TABLE RESERVATIONS</span>
            {reservations.filter((r) => r.status === "pending").length > 0 && (
              <span className="ml-1 rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] font-bold text-black">
                {reservations.filter((r) => r.status === "pending").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === "inquiries"
                ? "border border-[#e2c569] bg-[#e2c569] text-black shadow-[0_0_15px_rgba(226,197,105,0.3)]"
                : "border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-[#e2c569]/40 hover:text-white"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>INQUIRIES / MESSAGES</span>
            {inquiries.filter((i) => i.status === "new").length > 0 && (
              <span className="ml-1 rounded-full bg-emerald-500 px-1.5 py-0.2 text-[10px] font-bold text-black">
                {inquiries.filter((i) => i.status === "new").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === "whatsapp"
                ? "border border-[#e2c569] bg-[#e2c569] text-black shadow-[0_0_15px_rgba(226,197,105,0.3)]"
                : "border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-[#e2c569]/40 hover:text-white"
            }`}
          >
            <MessageSquare className="h-4 w-4 text-emerald-400" />
            <span>WHATSAPP CLICKS</span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
              {summary.totalWhatsAppClicks}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("traffic")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === "traffic"
                ? "border border-[#e2c569] bg-[#e2c569] text-black shadow-[0_0_15px_rgba(226,197,105,0.3)]"
                : "border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-[#e2c569]/40 hover:text-white"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>LIVE VIEWERS & TRAFFIC</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === "settings"
                ? "border border-[#e2c569] bg-[#e2c569] text-black shadow-[0_0_15px_rgba(226,197,105,0.3)]"
                : "border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-[#e2c569]/40 hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>SECURITY & SETTINGS</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW & KEY STATS */}
        {/* ==================================================== */}
        {activeTab === "overview" && (
          <div className="mt-6 space-y-8 animate-in fade-in-50 duration-300">
            {/* MASTER WEBSITE POWER & AVAILABILITY CONTROL HUB */}
            <div
              className={`relative overflow-hidden rounded-3xl border p-6 shadow-2xl transition-all duration-500 ${
                siteStatus.isSiteActive
                  ? "border-emerald-500/40 bg-gradient-to-r from-[#0c1f14] via-[#09150d] to-[#070e09] shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                  : "border-red-500/50 bg-gradient-to-r from-[#2a0d0d] via-[#1c0808] to-[#120505] shadow-[0_0_50px_rgba(239,68,68,0.25)]"
              }`}
            >
              {/* Background ambient glow */}
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${
                  siteStatus.isSiteActive ? "bg-emerald-500/10" : "bg-red-500/20"
                }`}
              />

              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Side: Status Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${
                        siteStatus.isSiteActive
                          ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "border-red-500/50 bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse"
                      }`}
                    >
                      {siteStatus.isSiteActive ? (
                        <Power className="h-5 w-5" />
                      ) : (
                        <PowerOff className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-cinzel text-lg font-bold tracking-wider text-white">
                          MASTER WEBSITE POWER SWITCH
                        </h2>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider ${
                            siteStatus.isSiteActive
                              ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                              : "border border-red-500/50 bg-red-500/30 text-red-200 animate-pulse"
                          }`}
                        >
                          {siteStatus.isSiteActive ? "🟢 SITE IS LIVE & RUNNING" : "🔴 SITE IS OFFLINE / STOPPED"}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">
                        {siteStatus.isSiteActive
                          ? "Website is publicly accessible. Customers can view menu, place orders & book tables."
                          : "Website is temporarily disabled for public visitors. Only Admins can access /admin."}
                      </p>
                    </div>
                  </div>

                  {/* If site is offline, show current notice snippet */}
                  {!siteStatus.isSiteActive && (
                    <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-200">
                      <ShieldAlert className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                      <div>
                        <span className="font-semibold text-red-300">Active Notice: </span>
                        <span>"{siteStatus.maintenanceTitle}" — {siteStatus.maintenanceMessage.slice(0, 100)}...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Toggle Switch Controls & Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleToggleSiteStatus}
                    className={`flex items-center gap-3 rounded-2xl border px-6 py-3.5 font-cinzel text-sm font-bold tracking-widest transition-all shadow-xl active:scale-95 cursor-pointer ${
                      siteStatus.isSiteActive
                        ? "border-red-500/40 bg-gradient-to-r from-red-600/90 to-red-700/90 text-white hover:from-red-500 hover:to-red-600 shadow-[0_0_25px_rgba(239,68,68,0.35)]"
                        : "border-emerald-500/50 bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:brightness-110 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                    }`}
                  >
                    {siteStatus.isSiteActive ? (
                      <>
                        <PowerOff className="h-5 w-5" />
                        <span>TURN OFF SITE (STOP)</span>
                      </>
                    ) : (
                      <>
                        <Power className="h-5 w-5 text-black" />
                        <span>TURN ON SITE (START)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("settings")}
                    className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-4 py-3 text-xs font-semibold text-neutral-300 hover:border-[#e2c569] hover:text-white transition-colors"
                  >
                    <Settings className="h-4 w-4 text-[#e2c569]" />
                    <span>Edit Notice</span>
                  </button>

                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-4 py-3 text-xs font-semibold text-neutral-300 hover:border-[#e2c569] hover:text-white transition-colors"
                  >
                    <Globe className="h-4 w-4 text-[#e2c569]" />
                    <span>Preview Site</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Top KPI Stat Cards Grid (5 Cards) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {/* Card 1: Total Revenue */}
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#20180d] to-[#0e0a05] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-amber-400/90">TOTAL REVENUE</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    <Receipt className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-amber-300">
                  ₹{summary.totalRevenue.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-emerald-400 font-semibold">+₹{summary.todayRevenue} today</span>
                  <span>• Net Sales</span>
                </div>
              </div>

              {/* Card 2: Online & Counter Orders */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0e1f14] to-[#070e09] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-emerald-400/90">TOTAL ORDERS</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-emerald-400">
                  {summary.totalOrders}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-amber-400 font-semibold">{summary.pendingOrders} Active in Kitchen</span>
                </div>
              </div>

              {/* Card 3: Total Website Views */}
              <div className="relative overflow-hidden rounded-2xl border border-[#e2c569]/30 bg-gradient-to-b from-[#14120c] to-[#0a0907] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">PAGE VIEWS</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e2c569]/15 text-[#e2c569] border border-[#e2c569]/30">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-[#e2c569]">
                  {summary.totalViews.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-emerald-400 font-semibold">+{summary.todayViews} today</span>
                  <span>• {summary.uniqueVisitors} Users</span>
                </div>
              </div>

              {/* Card 4: Table Reservations */}
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#1f160b] to-[#0e0a05] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">TABLE BOOKINGS</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-amber-400">
                  {summary.totalReservations}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-amber-400 font-semibold">
                    {summary.pendingReservations} Pending
                  </span>
                </div>
              </div>

              {/* Card 5: WhatsApp Clicks */}
              <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-b from-[#0c1524] to-[#060a12] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">WHATSAPP LEADS</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-blue-400">
                  {summary.totalWhatsAppClicks}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-emerald-400 font-semibold">+{summary.todayWhatsApp} today</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Traffic Breakdown Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Page Views Breakdown */}
              <div className="rounded-2xl border border-[#e2c569]/25 bg-neutral-950 p-6 shadow-lg">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-cinzel text-sm font-bold text-[#e2c569] flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>PAGE VIEWS BREAKDOWN</span>
                  </h3>
                  <span className="text-xs text-neutral-400">Traffic Distribution</span>
                </div>

                <div className="mt-4 space-y-3.5">
                  {Object.entries(summary.pageMap).map(([page, count]) => {
                    const pct = Math.min(100, Math.round((count / (summary.totalViews || 1)) * 100));
                    return (
                      <div key={page} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-neutral-300">
                            {page === "/" ? "Home ( / )" : page}
                          </span>
                          <span className="font-bold text-[#e2c569]">
                            {count} views <span className="text-neutral-500 font-normal">({pct}%)</span>
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#c5a342] to-[#e2c569]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity Live Feed */}
              <div className="rounded-2xl border border-[#e2c569]/25 bg-neutral-950 p-6 shadow-lg">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-cinzel text-sm font-bold text-[#e2c569] flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>RECENT REAL-TIME ACTIVITY</span>
                  </h3>
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Live Feed
                  </span>
                </div>

                <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                  {/* Latest Orders in Feed */}
                  {orders.slice(0, 3).map((ord) => (
                    <div
                      key={ord.id}
                      className="flex items-start justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                          <ShoppingBag className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            Order {ord.id}: <span className="text-emerald-300">{ord.customerName}</span> ({ord.orderType.toUpperCase()} {ord.tableNo ? `• ${ord.tableNo}` : ""})
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            ₹{ord.totalAmount} • {ord.items.length} items • {ord.paymentStatus.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                          ord.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : ord.status === "preparing"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                  ))}

                  {/* Latest Reservations */}
                  {reservations.slice(0, 2).map((r) => (
                    <div
                      key={r.id}
                      className="flex items-start justify-between rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                          <Calendar className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            Table Booking: <span className="text-amber-300">{r.name}</span> ({r.guests})
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            {r.date} @ {r.time} • {r.phone}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                          r.status === "confirmed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}

                  {/* Latest WhatsApp Clicks */}
                  {summary.recentWhatsApp.slice(0, 2).map((w) => (
                    <div
                      key={w.id}
                      className="flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                          <MessageSquare className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-300">WhatsApp Button Clicked</p>
                          <p className="text-[10px] text-neutral-400">Source: {w.source}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-500">
                        {new Date(w.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: ONLINE & TABLE ORDERS MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === "orders" && (
          <div className="mt-6 space-y-6 animate-in fade-in-50 duration-300">
            {/* Top Orders KPI Strip */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#1c150c] to-[#0c0905] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-amber-400">TOTAL ORDER REVENUE</span>
                  <Receipt className="h-4 w-4 text-amber-400" />
                </div>
                <p className="mt-2 font-cinzel text-3xl font-bold text-amber-300">
                  ₹{summary.totalRevenue.toLocaleString()}
                </p>
                <p className="mt-1 text-[11px] text-emerald-400 font-semibold">
                  +₹{summary.todayRevenue} earned today
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-neutral-950 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">TOTAL ORDERS PLACED</span>
                  <ShoppingBag className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="mt-2 font-cinzel text-3xl font-bold text-emerald-400">
                  {orders.length}
                </p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  {summary.todayOrders} orders placed today
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/30 bg-neutral-950 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">ACTIVE IN KITCHEN</span>
                  <ChefHat className="h-4 w-4 text-blue-400" />
                </div>
                <p className="mt-2 font-cinzel text-3xl font-bold text-blue-400">
                  {orders.filter((o) => o.status === "pending" || o.status === "preparing").length}
                </p>
                <p className="mt-1 text-[11px] text-amber-300">
                  {orders.filter((o) => o.status === "pending").length} Pending • {orders.filter((o) => o.status === "preparing").length} Cooking
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/30 bg-neutral-950 p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">COMPLETED & SERVED</span>
                  <CheckCircle2 className="h-4 w-4 text-purple-400" />
                </div>
                <p className="mt-2 font-cinzel text-3xl font-bold text-purple-400">
                  {orders.filter((o) => o.status === "completed").length}
                </p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  {orders.filter((o) => o.status === "ready").length} Ready for pickup/serving
                </p>
              </div>
            </div>

            {/* Action Bar & Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by ID, name, phone, table..."
                    className="rounded-xl border border-neutral-800 bg-neutral-950 py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:border-[#e2c569] focus:outline-none w-64"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-300 focus:border-[#e2c569] focus:outline-none"
                >
                  <option value="all">All Kitchen Statuses ({orders.length})</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing / Cooking</option>
                  <option value="ready">Ready to Serve</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {/* Order Type Filter */}
                <select
                  value={orderTypeFilter}
                  onChange={(e) => setOrderTypeFilter(e.target.value as any)}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-300 focus:border-[#e2c569] focus:outline-none"
                >
                  <option value="all">All Order Types</option>
                  <option value="dine-in">Dine-In (Tables)</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddOrderModal(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#e2c569] bg-[#e2c569] px-3.5 py-2 text-xs font-cinzel font-bold text-black hover:brightness-110 shadow-md transition-all cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Counter Order</span>
                </button>

                <button
                  onClick={() => exportToCSV("Khokharz_Cafe_Orders", orders)}
                  className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:border-[#e2c569]/40 transition-colors"
                >
                  <Download className="h-4 w-4 text-[#e2c569]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Orders Cards Grid */}
            {filteredOrders.length === 0 ? (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-12 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-neutral-600" />
                <h4 className="mt-3 font-cinzel text-base font-bold text-neutral-300">
                  NO ORDERS FOUND
                </h4>
                <p className="mt-1 text-xs text-neutral-500">
                  {orderSearch || orderStatusFilter !== "all"
                    ? "Try adjusting your search query or filter."
                    : "Orders placed on the website or entered manually will appear here in real-time."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e2c569]/30 bg-gradient-to-b from-[#14120c] to-[#0c0a07] p-5 shadow-xl transition-all hover:border-[#e2c569] hover:shadow-[0_0_25px_rgba(226,197,105,0.15)]"
                  >
                    {/* Top Order Card Header */}
                    <div>
                      <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#e2c569]">
                              {ord.id}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                ord.orderType === "dine-in"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : ord.orderType === "takeaway"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              }`}
                            >
                              {ord.orderType} {ord.tableNo ? `(${ord.tableNo})` : ""}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-neutral-400">
                            {new Date(ord.createdAt).toLocaleDateString()} at{" "}
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>

                        {/* Payment Status Badge */}
                        <button
                          type="button"
                          onClick={() =>
                            handleOrderPaymentChange(
                              ord.id,
                              ord.paymentStatus === "paid" ? "cash_on_counter" : "paid"
                            )
                          }
                          title="Click to toggle Paid / Cash on counter"
                          className={`rounded-xl px-2.5 py-1 text-[10px] font-bold uppercase flex items-center gap-1 transition-all ${
                            ord.paymentStatus === "paid"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                          }`}
                        >
                          <CreditCard className="h-3 w-3" />
                          <span>{ord.paymentStatus === "paid" ? "PAID" : "CASH / DUE"}</span>
                        </button>
                      </div>

                      {/* Customer Info Strip */}
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-neutral-900/60 p-2.5 text-xs">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[#e2c569]" />
                          <span className="font-bold text-white">{ord.customerName}</span>
                          <span className="text-neutral-400">• {ord.phone}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {ord.phone && ord.phone !== "N/A" && ord.phone !== "Counter Order" && (
                            <>
                              <a
                                href={`tel:${ord.phone}`}
                                title="Call Customer"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e2c569]/15 text-[#e2c569] hover:bg-[#e2c569] hover:text-black transition-colors"
                              >
                                <Phone className="h-3.5 w-3.5" />
                              </a>
                              <a
                                href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                              </a>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Items Ordered List */}
                      <div className="mt-3 space-y-1.5">
                        <p className="text-[11px] font-cinzel font-bold text-neutral-400 uppercase tracking-wider">
                          ORDER ITEMS ({ord.items.reduce((s, i) => s + i.quantity, 0)} ITEMS):
                        </p>
                        <div className="space-y-1.5 rounded-xl border border-neutral-800 bg-black/40 p-3 text-xs">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#e2c569]">
                                  {item.quantity}x
                                </span>
                                <span className="text-neutral-200">{item.name}</span>
                                {item.size && (
                                  <span className="rounded bg-neutral-800 px-1.5 py-0.2 text-[9px] text-neutral-400">
                                    {item.size}
                                  </span>
                                )}
                              </div>
                              <span className="font-mono font-semibold text-[#e2c569]">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Special Cooking Notes */}
                      {ord.instructions && (
                        <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-2 text-xs text-amber-200">
                          <ChefHat className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
                          <span>
                            <strong className="text-amber-300">Kitchen Note:</strong> {ord.instructions}
                          </span>
                        </div>
                      )}

                      {/* Customer / Admin Cancellation Alert */}
                      {ord.status === "cancelled" && (
                        <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-950/60 p-2 text-xs text-red-200">
                          <span className="text-base leading-none">🚫</span>
                          <div>
                            <span className="font-bold text-red-300">
                              Order Cancelled {ord.cancelledBy ? `by ${ord.cancelledBy.toUpperCase()}` : ""}:
                            </span>{" "}
                            <span>{ord.cancellationReason || "Cancelled by customer within 1 minute"}</span>
                            {ord.cancelledAt && (
                              <p className="text-[10px] text-neutral-400 mt-0.5">
                                Time: {new Date(ord.cancelledAt).toLocaleTimeString()}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Total Calculation */}
                      <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-2.5 text-xs">
                        <span className="text-neutral-400">
                          Subtotal: ₹{ord.subtotal} + GST (5%): ₹{ord.taxes}
                        </span>
                        <div className="flex items-center gap-1 font-cinzel text-sm font-bold text-[#e2c569]">
                          <span>GRAND TOTAL:</span>
                          <span className="text-base text-amber-300">₹{ord.totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Controls & Actions */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-800/80 pt-3">
                      {/* Kitchen Status Dropdown & Quick Advance Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={ord.status}
                          onChange={(e) => handleOrderStatusChange(ord.id, e.target.value as any)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                            ord.status === "completed"
                              ? "border-emerald-500/50 bg-emerald-950 text-emerald-300"
                              : ord.status === "ready"
                              ? "border-purple-500/50 bg-purple-950 text-purple-300"
                              : ord.status === "preparing"
                              ? "border-amber-500/50 bg-amber-950 text-amber-300"
                              : ord.status === "cancelled"
                              ? "border-red-500/50 bg-red-950 text-red-300"
                              : "border-blue-500/50 bg-blue-950 text-blue-300"
                          }`}
                        >
                          <option value="pending">🟡 PENDING</option>
                          <option value="preparing">👨‍🍳 PREPARING</option>
                          <option value="ready">🔔 READY TO SERVE</option>
                          <option value="completed">✅ COMPLETED</option>
                          <option value="cancelled">❌ CANCELLED</option>
                        </select>

                        {ord.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => handleOrderStatusChange(ord.id, "preparing")}
                            className="rounded-lg border border-amber-500/50 bg-amber-500/20 px-2.5 py-1 text-[11px] font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
                          >
                            👨‍🍳 Start Cooking
                          </button>
                        )}

                        {ord.status === "preparing" && (
                          <button
                            type="button"
                            onClick={() => handleOrderStatusChange(ord.id, "ready")}
                            className="rounded-lg border border-purple-500/50 bg-purple-500/20 px-2.5 py-1 text-[11px] font-bold text-purple-300 hover:bg-purple-500 hover:text-black transition-all cursor-pointer"
                          >
                            🔔 Mark Ready
                          </button>
                        )}

                        {ord.status === "ready" && (
                          <button
                            type="button"
                            onClick={() => handleOrderStatusChange(ord.id, "completed")}
                            className="rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
                          >
                            ✅ Mark Served
                          </button>
                        )}
                      </div>

                      {/* Print & Delete buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(ord)}
                          title="Print Receipt Slip"
                          className="flex h-8 items-center gap-1 rounded-xl border border-neutral-700 bg-neutral-900 px-2.5 text-xs text-neutral-300 hover:border-[#e2c569] hover:text-[#e2c569] transition-colors cursor-pointer"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Receipt</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(ord.id)}
                          title="Delete Order"
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW & KEY STATS */}
        {/* ==================================================== */}
        {activeTab === "overview" && (
          <div className="mt-6 space-y-8 animate-in fade-in-50 duration-300">
            {/* MASTER WEBSITE POWER & AVAILABILITY CONTROL HUB */}
            <div
              className={`relative overflow-hidden rounded-3xl border p-6 shadow-2xl transition-all duration-500 ${
                siteStatus.isSiteActive
                  ? "border-emerald-500/40 bg-gradient-to-r from-[#0c1f14] via-[#09150d] to-[#070e09] shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                  : "border-red-500/50 bg-gradient-to-r from-[#2a0d0d] via-[#1c0808] to-[#120505] shadow-[0_0_50px_rgba(239,68,68,0.25)]"
              }`}
            >
              {/* Background ambient glow */}
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${
                  siteStatus.isSiteActive ? "bg-emerald-500/10" : "bg-red-500/20"
                }`}
              />

              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Side: Status Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${
                        siteStatus.isSiteActive
                          ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "border-red-500/50 bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse"
                      }`}
                    >
                      {siteStatus.isSiteActive ? (
                        <Power className="h-5 w-5" />
                      ) : (
                        <PowerOff className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-cinzel text-lg font-bold tracking-wider text-white">
                          MASTER WEBSITE POWER SWITCH
                        </h2>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider ${
                            siteStatus.isSiteActive
                              ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                              : "border border-red-500/50 bg-red-500/30 text-red-200 animate-pulse"
                          }`}
                        >
                          {siteStatus.isSiteActive ? "🟢 SITE IS LIVE & RUNNING" : "🔴 SITE IS OFFLINE / STOPPED"}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">
                        {siteStatus.isSiteActive
                          ? "Website is publicly accessible. Customers can view menu, place orders & book tables."
                          : "Website is temporarily disabled for public visitors. Only Admins can access /admin."}
                      </p>
                    </div>
                  </div>

                  {/* If site is offline, show current notice snippet */}
                  {!siteStatus.isSiteActive && (
                    <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-200">
                      <ShieldAlert className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                      <div>
                        <span className="font-semibold text-red-300">Active Notice: </span>
                        <span>"{siteStatus.maintenanceTitle}" — {siteStatus.maintenanceMessage.slice(0, 100)}...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Toggle Switch Controls & Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleToggleSiteStatus}
                    className={`flex items-center gap-3 rounded-2xl border px-6 py-3.5 font-cinzel text-sm font-bold tracking-widest transition-all shadow-xl active:scale-95 cursor-pointer ${
                      siteStatus.isSiteActive
                        ? "border-red-500/40 bg-gradient-to-r from-red-600/90 to-red-700/90 text-white hover:from-red-500 hover:to-red-600 shadow-[0_0_25px_rgba(239,68,68,0.35)]"
                        : "border-emerald-500/50 bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:brightness-110 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                    }`}
                  >
                    {siteStatus.isSiteActive ? (
                      <>
                        <PowerOff className="h-5 w-5" />
                        <span>TURN OFF SITE (STOP)</span>
                      </>
                    ) : (
                      <>
                        <Power className="h-5 w-5 text-black" />
                        <span>TURN ON SITE (START)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("settings")}
                    className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-4 py-3 text-xs font-semibold text-neutral-300 hover:border-[#e2c569] hover:text-white transition-colors"
                  >
                    <Settings className="h-4 w-4 text-[#e2c569]" />
                    <span>Edit Notice</span>
                  </button>

                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-4 py-3 text-xs font-semibold text-neutral-300 hover:border-[#e2c569] hover:text-white transition-colors"
                  >
                    <Globe className="h-4 w-4 text-[#e2c569]" />
                    <span>Preview Site</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Top KPI Stat Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1: Total Website Views */}
              <div className="relative overflow-hidden rounded-2xl border border-[#e2c569]/30 bg-gradient-to-b from-[#14120c] to-[#0a0907] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">TOTAL PAGE VIEWS</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e2c569]/15 text-[#e2c569] border border-[#e2c569]/30">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-[#e2c569]">
                  {summary.totalViews.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-emerald-400 font-semibold">+{summary.todayViews} today</span>
                  <span>• {summary.uniqueVisitors} Unique Users</span>
                </div>
              </div>

              {/* Card 2: WhatsApp Button Clicks */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#0e1f14] to-[#070e09] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">WHATSAPP CLICKS</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-emerald-400">
                  {summary.totalWhatsAppClicks.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-emerald-400 font-semibold">+{summary.todayWhatsApp} today</span>
                  <span>• Direct Leads</span>
                </div>
              </div>

              {/* Card 3: Table Reservations */}
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#1f160b] to-[#0e0a05] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">TABLE BOOKINGS</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-amber-400">
                  {summary.totalReservations}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-amber-400 font-semibold">
                    {summary.pendingReservations} Pending Review
                  </span>
                </div>
              </div>

              {/* Card 4: Contact Inquiries */}
              <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-b from-[#0c1524] to-[#060a12] p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-neutral-400">CONTACT INQUIRIES</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-cinzel text-3xl font-bold text-blue-400">
                  {summary.totalInquiries}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="text-blue-400 font-semibold">{summary.newInquiries} New Unread</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Traffic Breakdown Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Page Views Breakdown */}
              <div className="rounded-2xl border border-[#e2c569]/25 bg-neutral-950 p-6 shadow-lg">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-cinzel text-sm font-bold text-[#e2c569] flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>PAGE VIEWS BREAKDOWN</span>
                  </h3>
                  <span className="text-xs text-neutral-400">Traffic Distribution</span>
                </div>

                <div className="mt-4 space-y-3.5">
                  {Object.entries(summary.pageMap).map(([page, count]) => {
                    const pct = Math.min(100, Math.round((count / summary.totalViews) * 100));
                    return (
                      <div key={page} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-neutral-300">
                            {page === "/" ? "Home ( / )" : page}
                          </span>
                          <span className="font-bold text-[#e2c569]">
                            {count} views <span className="text-neutral-500 font-normal">({pct}%)</span>
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#c5a342] to-[#e2c569]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity Live Feed */}
              <div className="rounded-2xl border border-[#e2c569]/25 bg-neutral-950 p-6 shadow-lg">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-cinzel text-sm font-bold text-[#e2c569] flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>RECENT REAL-TIME ACTIVITY</span>
                  </h3>
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Live
                  </span>
                </div>

                <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                  {/* Latest Reservations */}
                  {reservations.slice(0, 3).map((r) => (
                    <div
                      key={r.id}
                      className="flex items-start justify-between rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                          <Calendar className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            Table Booking: <span className="text-amber-300">{r.name}</span> ({r.guests})
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            {r.date} @ {r.time} • {r.phone}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                          r.status === "confirmed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}

                  {/* Latest Inquiries */}
                  {inquiries.slice(0, 2).map((inq) => (
                    <div
                      key={inq.id}
                      className="flex items-start justify-between rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                          <Mail className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            Query: <span className="text-blue-300">{inq.name}</span>
                          </p>
                          <p className="text-[10px] text-neutral-400 truncate max-w-xs">
                            {inq.subject}
                          </p>
                        </div>
                      </div>
                      <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold text-blue-300 uppercase">
                        {inq.status}
                      </span>
                    </div>
                  ))}

                  {/* Latest WhatsApp Clicks */}
                  {summary.recentWhatsApp.slice(0, 2).map((w) => (
                    <div
                      key={w.id}
                      className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                          <MessageSquare className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-emerald-300">WhatsApp Button Clicked</p>
                          <p className="text-[10px] text-neutral-400">Source: {w.source}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-500">
                        {new Date(w.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: TABLE RESERVATIONS MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === "reservations" && (
          <div className="mt-6 space-y-6 animate-in fade-in-50 duration-300">
            {/* Action Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    value={resSearch}
                    onChange={(e) => setResSearch(e.target.value)}
                    placeholder="Search by name, phone, id..."
                    className="rounded-xl border border-neutral-800 bg-neutral-950 py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:border-[#e2c569] focus:outline-none"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={resFilter}
                  onChange={(e) => setResFilter(e.target.value as any)}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-300 focus:border-[#e2c569] focus:outline-none"
                >
                  <option value="all">All Statuses ({reservations.length})</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddResModal(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#e2c569] bg-[#e2c569] px-3.5 py-2 text-xs font-cinzel font-bold text-black hover:brightness-110 shadow-md transition-all"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Booking</span>
                </button>

                <button
                  onClick={() => exportToCSV("Khokharz_Table_Reservations", reservations)}
                  className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:border-[#e2c569]/40 transition-colors"
                >
                  <Download className="h-4 w-4 text-[#e2c569]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Reservations Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#e2c569]/25 bg-neutral-950 shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-800 bg-neutral-900/60 font-cinzel text-[11px] font-bold text-[#e2c569]">
                  <tr>
                    <th className="px-4 py-3.5">ID / DATE</th>
                    <th className="px-4 py-3.5">CUSTOMER NAME</th>
                    <th className="px-4 py-3.5">CONTACT & CHAT</th>
                    <th className="px-4 py-3.5">SLOT & GUESTS</th>
                    <th className="px-4 py-3.5">SEATING</th>
                    <th className="px-4 py-3.5">STATUS</th>
                    <th className="px-4 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-500">
                        No reservations found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((r) => (
                      <tr key={r.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="px-4 py-3.5">
                          <span className="font-mono font-bold text-[#e2c569]">{r.id}</span>
                          <p className="text-[10px] text-neutral-400">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-bold text-white text-sm">{r.name}</p>
                          {r.specialRequests && (
                            <p className="text-[10px] text-amber-300/80 italic max-w-xs">
                              Note: {r.specialRequests}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-neutral-300 font-mono">{r.phone}</p>
                          <div className="mt-1 flex items-center gap-1.5">
                            {/* WhatsApp Button with pre-filled message */}
                            <a
                              href={`https://wa.me/${r.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                                r.name,
                              )},%20this%20is%20Khokharz%20Cafe%20regarding%20your%20table%20reservation%20for%20${encodeURIComponent(
                                r.guests,
                              )}%20on%20${encodeURIComponent(r.date)}%20at%20${encodeURIComponent(r.time)}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                            >
                              💬 WhatsApp
                            </a>
                            <a
                              href={`tel:${r.phone}`}
                              className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-colors"
                            >
                              📞 Call
                            </a>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-white">
                            {r.date} • {r.time}
                          </p>
                          <p className="text-[11px] text-neutral-400">{r.guests}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-[11px] text-neutral-300">
                            {r.seating}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <select
                            value={r.status}
                            onChange={(e) => handleResStatusChange(r.id, e.target.value as any)}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase focus:outline-none ${
                              r.status === "confirmed"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : r.status === "pending"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                                : r.status === "completed"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                                : "bg-red-500/20 text-red-400 border border-red-500/40"
                            }`}
                          >
                            <option value="pending" className="bg-neutral-900 text-amber-400">
                              PENDING
                            </option>
                            <option value="confirmed" className="bg-neutral-900 text-emerald-400">
                              CONFIRMED
                            </option>
                            <option value="completed" className="bg-neutral-900 text-blue-400">
                              COMPLETED
                            </option>
                            <option value="cancelled" className="bg-neutral-900 text-red-400">
                              CANCELLED
                            </option>
                          </select>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => handleDeleteRes(r.id)}
                            title="Delete Record"
                            className="rounded-lg p-1.5 text-neutral-500 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Manual Add Reservation Modal */}
            {showAddResModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in-0 duration-200">
                <div className="relative w-full max-w-md rounded-2xl border border-[#e2c569]/40 bg-neutral-950 p-6 text-white shadow-2xl">
                  <h3 className="font-cinzel text-lg font-bold text-[#e2c569]">
                    NEW TABLE RESERVATION
                  </h3>
                  <form onSubmit={handleCreateManualReservation} className="mt-4 space-y-3 text-xs">
                    <div>
                      <label className="block text-neutral-400 mb-1">Customer Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newResData.name}
                        onChange={(e) => setNewResData({ ...newResData, name: e.target.value })}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-white"
                        placeholder="e.g. Jaswinder Singh"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-400 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={newResData.phone}
                          onChange={(e) => setNewResData({ ...newResData, phone: e.target.value })}
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-white"
                          placeholder="+91 98123 45678"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Email</label>
                        <input
                          type="email"
                          value={newResData.email}
                          onChange={(e) => setNewResData({ ...newResData, email: e.target.value })}
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-white"
                          placeholder="optional@gmail.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-neutral-400 mb-1">Date</label>
                        <input
                          type="text"
                          value={newResData.date}
                          onChange={(e) => setNewResData({ ...newResData, date: e.target.value })}
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Time</label>
                        <input
                          type="text"
                          value={newResData.time}
                          onChange={(e) => setNewResData({ ...newResData, time: e.target.value })}
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Guests</label>
                        <input
                          type="text"
                          value={newResData.guests}
                          onChange={(e) => setNewResData({ ...newResData, guests: e.target.value })}
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Special Notes</label>
                      <input
                        type="text"
                        value={newResData.specialRequests}
                        onChange={(e) => setNewResData({ ...newResData, specialRequests: e.target.value })}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-white"
                        placeholder="Birthday, window preference, etc."
                      />
                    </div>

                    <div className="mt-5 flex justify-end gap-2 pt-2 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setShowAddResModal(false)}
                        className="rounded-lg border border-neutral-800 px-3 py-2 text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-[#e2c569] px-4 py-2 font-bold text-black hover:brightness-110"
                      >
                        Save Booking
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: CONTACT INQUIRIES */}
        {/* ==================================================== */}
        {activeTab === "inquiries" && (
          <div className="mt-6 space-y-6 animate-in fade-in-50 duration-300">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    value={inqSearch}
                    onChange={(e) => setInqSearch(e.target.value)}
                    placeholder="Search queries, email..."
                    className="rounded-xl border border-neutral-800 bg-neutral-950 py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:border-[#e2c569] focus:outline-none"
                  />
                </div>

                <select
                  value={inqFilter}
                  onChange={(e) => setInqFilter(e.target.value as any)}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-300 focus:border-[#e2c569] focus:outline-none"
                >
                  <option value="all">All Inquiries ({inquiries.length})</option>
                  <option value="new">New / Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>

              <button
                onClick={() => exportToCSV("Khokharz_Contact_Inquiries", inquiries)}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                <Download className="h-4 w-4 text-[#e2c569]" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredInquiries.length === 0 ? (
                <div className="col-span-full py-12 text-center text-neutral-500">
                  No inquiries found.
                </div>
              ) : (
                filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                      inq.status === "new"
                        ? "border-emerald-500/50 bg-[#0c1610] shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        : "border-neutral-800 bg-neutral-950 hover:border-[#e2c569]/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-[#e2c569]">
                          {inq.id}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase ${
                            inq.status === "new"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : inq.status === "replied"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>

                      <h4 className="mt-3 font-cinzel text-base font-bold text-white">
                        {inq.name}
                      </h4>
                      <p className="text-xs text-neutral-400">{inq.email}</p>
                      {inq.phone && (
                        <p className="text-xs text-neutral-400 font-mono">{inq.phone}</p>
                      )}

                      <div className="mt-3 rounded-xl bg-neutral-900/80 p-3 text-xs text-neutral-200">
                        <p className="font-semibold text-[#e2c569] mb-1">{inq.subject}</p>
                        <p className="line-clamp-3 text-neutral-300 leading-relaxed">
                          {inq.message}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-neutral-800/80 pt-3">
                      <span className="text-[10px] text-neutral-500">
                        {new Date(inq.createdAt).toLocaleString([], {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                              inq.name,
                            )},%20thank%20you%20for%20contacting%20Khokharz%20Cafe!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded bg-emerald-500/20 p-1.5 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                            title="Reply on WhatsApp"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                          </a>
                        )}

                        <a
                          href={`mailto:${inq.email}?subject=Khokharz%20Cafe%20Response%20-%20${encodeURIComponent(
                            inq.subject,
                          )}`}
                          className="rounded bg-blue-500/20 p-1.5 text-blue-300 hover:bg-blue-500 hover:text-black transition-colors"
                          title="Reply via Email"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>

                        <button
                          onClick={() =>
                            handleInqStatusChange(
                              inq.id,
                              inq.status === "replied" ? "read" : "replied",
                            )
                          }
                          className="rounded bg-neutral-800 p-1.5 text-neutral-300 hover:text-white"
                          title="Toggle Replied"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteInq(inq.id)}
                          className="rounded bg-neutral-800 p-1.5 text-neutral-500 hover:bg-red-500/20 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: WHATSAPP BUTTON CLICKS */}
        {/* ==================================================== */}
        {activeTab === "whatsapp" && (
          <div className="mt-6 space-y-6 animate-in fade-in-50 duration-300">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-[#0e1d13] p-5">
                <span className="font-cinzel text-xs font-bold text-emerald-400">
                  TOTAL WHATSAPP CLICKS
                </span>
                <p className="mt-2 font-cinzel text-3xl font-bold text-white">
                  {summary.totalWhatsAppClicks}
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">All-time customer engagements</p>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-[#0e1d13] p-5">
                <span className="font-cinzel text-xs font-bold text-emerald-400">
                  TODAY'S CLICKS
                </span>
                <p className="mt-2 font-cinzel text-3xl font-bold text-emerald-300">
                  {summary.todayWhatsApp}
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">High conversion visitors</p>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-[#0e1d13] p-5">
                <span className="font-cinzel text-xs font-bold text-emerald-400">TARGET WHATSAPP</span>
                <p className="mt-2 font-mono text-lg font-bold text-white">{SITE.phone}</p>
                <p className="text-[11px] text-neutral-400 mt-1">Direct business number</p>
              </div>
            </div>

            {/* Click Event Log Table */}
            <div className="rounded-2xl border border-emerald-500/30 bg-neutral-950 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/60 px-6 py-4">
                <h3 className="font-cinzel text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>WHATSAPP INTERACTION AUDIT TRAIL</span>
                </h3>
                <span className="text-xs text-neutral-400">Real-time click log</span>
              </div>

              <div className="divide-y divide-neutral-800/60 max-h-96 overflow-y-auto">
                {summary.recentWhatsApp.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 text-xs">
                    No WhatsApp clicks recorded yet. Every click on the floating widget or contact button will appear here!
                  </div>
                ) : (
                  summary.recentWhatsApp.map((w, idx) => (
                    <div key={w.id || idx} className="flex items-center justify-between p-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
                          #{idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-white">{w.source}</p>
                          <p className="text-[11px] text-neutral-400 font-mono">
                            Page: {w.page || "/"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-emerald-400">
                          {new Date(w.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          {new Date(w.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: LIVE VIEWERS & TRAFFIC */}
        {/* ==================================================== */}
        {activeTab === "traffic" && (
          <div className="mt-6 space-y-6 animate-in fade-in-50 duration-300">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#e2c569]/30 bg-neutral-950 p-5">
                <span className="font-cinzel text-xs font-bold text-neutral-400">TOTAL PAGE VIEWS</span>
                <p className="mt-2 font-cinzel text-3xl font-bold text-[#e2c569]">
                  {summary.totalViews}
                </p>
              </div>

              <div className="rounded-2xl border border-[#e2c569]/30 bg-neutral-950 p-5">
                <span className="font-cinzel text-xs font-bold text-neutral-400">UNIQUE VISITORS</span>
                <p className="mt-2 font-cinzel text-3xl font-bold text-amber-300">
                  {summary.uniqueVisitors}
                </p>
              </div>

              <div className="rounded-2xl border border-[#e2c569]/30 bg-neutral-950 p-5">
                <span className="font-cinzel text-xs font-bold text-neutral-400">TODAY'S VIEWS</span>
                <p className="mt-2 font-cinzel text-3xl font-bold text-emerald-400">
                  {summary.todayViews}
                </p>
              </div>
            </div>

            {/* Recent Pageview Audit Log */}
            <div className="rounded-2xl border border-[#e2c569]/25 bg-neutral-950 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/60 px-6 py-4">
                <h3 className="font-cinzel text-sm font-bold text-[#e2c569] flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>RECENT VISITOR BROWSING LOG</span>
                </h3>
                <span className="text-xs text-neutral-400">Last 15 Sessions</span>
              </div>

              <div className="divide-y divide-neutral-800/60 max-h-96 overflow-y-auto">
                {summary.recentViews.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 text-xs">
                    No visitor logs captured yet. Browsing pages will log views here automatically.
                  </div>
                ) : (
                  summary.recentViews.map((v, idx) => (
                    <div key={v.id || idx} className="flex items-center justify-between p-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e2c569]/15 text-[#e2c569]">
                          {v.device === "Mobile" ? (
                            <Smartphone className="h-4 w-4" />
                          ) : (
                            <Monitor className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white font-mono">
                            {v.path === "/" ? "Home ( / )" : v.path}
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            {v.device} • {v.browser} • ID: {v.visitorId.slice(0, 10)}...
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[#e2c569]">
                          {new Date(v.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          {new Date(v.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: SECURITY & SETTINGS */}
        {/* ==================================================== */}
        {activeTab === "settings" && (
          <div className="mt-6 max-w-2xl space-y-8 animate-in fade-in-50 duration-300">
            {/* 1. WEBSITE POWER SWITCH & MAINTENANCE MODE CONTROLS */}
            <div
              className={`rounded-2xl border p-6 shadow-xl transition-all duration-300 ${
                siteStatus.isSiteActive
                  ? "border-emerald-500/40 bg-gradient-to-b from-[#0b1a11] to-[#070f0a]"
                  : "border-red-500/50 bg-gradient-to-b from-[#1f0909] to-[#0f0404]"
              }`}
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                      siteStatus.isSiteActive
                        ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                        : "border-red-500/50 bg-red-500/20 text-red-400 animate-pulse"
                    }`}
                  >
                    {siteStatus.isSiteActive ? <Power className="h-5 w-5" /> : <PowerOff className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-white">
                      WEBSITE POWER & MAINTENANCE MODE
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Instantly turn website ON or OFF for public visitors.
                    </p>
                  </div>
                </div>

                {/* Main Toggle Switch Button */}
                <button
                  type="button"
                  onClick={handleToggleSiteStatus}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-cinzel font-bold transition-all shadow-md active:scale-95 ${
                    siteStatus.isSiteActive
                      ? "border border-emerald-500/50 bg-emerald-500 text-black hover:brightness-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "border border-red-500/50 bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  }`}
                >
                  {siteStatus.isSiteActive ? "🟢 SITE IS ON (LIVE)" : "🔴 SITE IS OFF (PAUSED)"}
                </button>
              </div>

              {/* Maintenance Notice Customizer Form */}
              <form onSubmit={handleSaveMaintenanceSettings} className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    MAINTENANCE SCREEN HEADING / TITLE
                  </label>
                  <input
                    type="text"
                    required
                    value={maintTitleInput}
                    onChange={(e) => setMaintTitleInput(e.target.value)}
                    placeholder="e.g. Website Temporarily Offline / We'll Be Back Soon"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    MAINTENANCE MESSAGE / ANNOUNCEMENT FOR VISITORS
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={maintMsgInput}
                    onChange={(e) => setMaintMsgInput(e.target.value)}
                    placeholder="Explain why the site is down or when you expect to be back..."
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Quick Notice Presets */}
                <div>
                  <span className="block text-[11px] text-neutral-400 mb-1.5 font-cinzel">
                    ⚡ QUICK MESSAGE TEMPLATES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMaintTitleInput("Scheduled System Maintenance");
                        setMaintMsgInput(
                          "We are currently upgrading our ordering and menu system. We will be back online shortly! For immediate assistance, please call us."
                        );
                      }}
                      className="rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300 hover:border-[#e2c569] hover:text-white"
                    >
                      System Upgrade
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMaintTitleInput("Cafe Closed for Today");
                        setMaintMsgInput(
                          "Khokharz Cafe is closed today for a private event or holiday. We look forward to serving you tomorrow during regular hours!"
                        );
                      }}
                      className="rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300 hover:border-[#e2c569] hover:text-white"
                    >
                      Holiday / Closed
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMaintTitleInput("We'll Be Back Shortly");
                        setMaintMsgInput(
                          "Online reservations and takeaway orders are temporarily paused. Feel free to contact us via WhatsApp or Phone."
                        );
                      }}
                      className="rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300 hover:border-[#e2c569] hover:text-white"
                    >
                      Default Notice
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="rounded-xl border border-[#e2c569] bg-[#e2c569] px-5 py-2.5 font-cinzel font-bold text-xs text-black hover:brightness-110 shadow-md transition-all cursor-pointer"
                  >
                    SAVE MAINTENANCE NOTICE
                  </button>

                  <span className="text-[10px] text-neutral-500">
                    Last updated: {new Date(siteStatus.updatedAt).toLocaleString()}
                  </span>
                </div>
              </form>
            </div>

            {/* 2. Change Credentials Form */}
            <div className="rounded-2xl border border-[#e2c569]/30 bg-neutral-950 p-6 shadow-xl">
              <h3 className="font-cinzel text-base font-bold text-[#e2c569] flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                <span>CHANGE ADMIN USERNAME & STRONG PASSWORD</span>
              </h3>
              <p className="mt-1 text-xs text-neutral-400">
                Ensure strong passwords with at least 8 characters, numbers, and symbols.
              </p>

              {settingsSuccess && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{settingsSuccess}</span>
                </div>
              )}

              {settingsError && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{settingsError}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    NEW USERNAME / EMAIL (Leave blank to keep current)
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="e.g. owner@khokharzcafe.com"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    NEW STRONG PASSWORD
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    CONFIRM NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl border border-[#e2c569] bg-[#e2c569] px-5 py-2.5 font-cinzel font-bold text-xs text-black hover:brightness-110 shadow-md transition-all"
                >
                  SAVE NEW CREDENTIALS
                </button>
              </form>
            </div>

            {/* Database & Data Management */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-xl space-y-4">
              <h3 className="font-cinzel text-base font-bold text-neutral-200">
                DATABASE BACKUP & SYSTEM ACTIONS
              </h3>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const fullBackup = {
                      credentials: getAdminCredentials(),
                      reservations: getReservations(),
                      inquiries: getInquiries(),
                      analytics: getAnalyticsSummary(),
                      exportedAt: new Date().toISOString(),
                    };
                    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `KhokharzCafe_Database_Backup_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                  }}
                  className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white hover:border-[#e2c569] transition-colors"
                >
                  <Download className="h-4 w-4 text-[#e2c569]" />
                  <span>Download Full JSON Backup</span>
                </button>

                <button
                  onClick={handleClearAllData}
                  className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear All Admin Data (Reset to 0)</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ==================================================== */}
        {/* MODAL 1: ORDER BILL RECEIPT & SLIP PRINT */}
        {/* ==================================================== */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in-50 duration-200">
            <div className="relative w-full max-w-md rounded-3xl border border-[#e2c569]/40 bg-[#0c0a07] p-6 text-white shadow-[0_0_60px_rgba(226,197,105,0.25)]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                ✕
              </button>

              {/* Printable Receipt Area */}
              <div id="printable-order-receipt" className="space-y-4 text-center">
                <div className="border-b border-[#e2c569]/20 pb-3">
                  <span className="font-cinzel text-xl font-bold tracking-widest text-[#e2c569]">
                    KHOKHARZ CAFE
                  </span>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Emera Place, Halifax, NS • Tel: {SITE.phone}</p>
                  <p className="text-[10px] font-mono text-emerald-400 mt-1 uppercase font-bold tracking-wider">
                    ★ KITCHEN ORDER TOKEN & OFFICIAL BILL ★
                  </p>
                </div>

                <div className="flex justify-between text-left text-xs text-neutral-300">
                  <div>
                    <p className="font-mono font-bold text-white">ID: {selectedOrder.id}</p>
                    <p className="text-[11px] text-neutral-400">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase">
                      {selectedOrder.orderType} {selectedOrder.tableNo ? `(${selectedOrder.tableNo})` : ""}
                    </span>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Cust: <strong className="text-white">{selectedOrder.customerName}</strong>
                    </p>
                  </div>
                </div>

                {/* Items Breakdown Table */}
                <div className="overflow-hidden rounded-xl border border-neutral-800 text-left text-xs">
                  <div className="grid grid-cols-12 bg-neutral-900/80 p-2 font-cinzel font-bold text-[#e2c569] text-[10px]">
                    <div className="col-span-6">ITEM</div>
                    <div className="col-span-2 text-center">QTY</div>
                    <div className="col-span-2 text-right">RATE</div>
                    <div className="col-span-2 text-right">TOTAL</div>
                  </div>
                  <div className="divide-y divide-neutral-800/60 p-2 space-y-1.5 font-mono">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 text-xs py-1">
                        <div className="col-span-6 text-neutral-200 truncate pr-1">
                          {item.name} {item.size ? `(${item.size})` : ""}
                        </div>
                        <div className="col-span-2 text-center font-bold text-[#e2c569]">
                          {item.quantity}
                        </div>
                        <div className="col-span-2 text-right text-neutral-400">
                          ₹{item.price}
                        </div>
                        <div className="col-span-2 text-right font-bold text-white">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.instructions && (
                  <div className="rounded-lg bg-amber-500/10 p-2 text-left text-xs text-amber-300">
                    <strong>Special Cooking Note:</strong> {selectedOrder.instructions}
                  </div>
                )}

                {/* Financials */}
                <div className="space-y-1 border-t border-neutral-800 pt-2 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono">₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%):</span>
                    <span className="font-mono">₹{selectedOrder.taxes}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-1 font-cinzel text-base font-bold text-[#e2c569]">
                    <span>GRAND TOTAL:</span>
                    <span className="text-amber-300">₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>

                <div className="flex justify-between text-left text-[11px] text-neutral-400 pt-1">
                  <span>Payment: <strong className="text-emerald-400 uppercase">{selectedOrder.paymentStatus}</strong></span>
                  <span>Kitchen: <strong className="text-amber-400 uppercase">{selectedOrder.status}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#e2c569] bg-[#e2c569] py-2.5 font-cinzel text-xs font-bold text-black hover:brightness-110 shadow-md transition-all cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>PRINT RECEIPT / SLIP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODAL 2: MANUAL ADD COUNTER / PHONE ORDER */}
        {/* ==================================================== */}
        {showAddOrderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in-50 duration-200">
            <div className="relative w-full max-w-md rounded-3xl border border-[#e2c569]/40 bg-[#0c0a07] p-6 text-white shadow-[0_0_60px_rgba(226,197,105,0.25)]">
              <button
                onClick={() => setShowAddOrderModal(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-2.5 border-b border-[#e2c569]/20 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e2c569]/15 text-[#e2c569]">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#e2c569]">
                    TAKE COUNTER / PHONE ORDER
                  </h3>
                  <p className="text-[10px] text-neutral-400">Directly enter order into Kitchen System</p>
                </div>
              </div>

              <form onSubmit={handleCreateManualOrder} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    CUSTOMER NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrderData.customerName}
                    onChange={(e) => setNewOrderData({ ...newOrderData, customerName: e.target.value })}
                    placeholder="e.g. Jaspreet Singh"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={newOrderData.phone}
                      onChange={(e) => setNewOrderData({ ...newOrderData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      ORDER TYPE
                    </label>
                    <select
                      value={newOrderData.orderType}
                      onChange={(e) => setNewOrderData({ ...newOrderData, orderType: e.target.value as any })}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white focus:border-[#e2c569] focus:outline-none"
                    >
                      <option value="dine-in">Dine-In (Table)</option>
                      <option value="takeaway">Takeaway</option>
                      <option value="delivery">Delivery</option>
                    </select>
                  </div>
                </div>

                {newOrderData.orderType === "dine-in" && (
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      TABLE NUMBER
                    </label>
                    <input
                      type="text"
                      value={newOrderData.tableNo}
                      onChange={(e) => setNewOrderData({ ...newOrderData, tableNo: e.target.value })}
                      placeholder="e.g. Table 02 / Patio 01"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-neutral-300 font-semibold mb-1">
                      MENU ITEM NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={newOrderData.itemName}
                      onChange={(e) => setNewOrderData({ ...newOrderData, itemName: e.target.value })}
                      placeholder="e.g. Hazelnut Latte"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      PRICE (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newOrderData.itemPrice}
                      onChange={(e) => setNewOrderData({ ...newOrderData, itemPrice: Number(e.target.value) })}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    COOKING / CHEF INSTRUCTIONS
                  </label>
                  <input
                    type="text"
                    value={newOrderData.instructions}
                    onChange={(e) => setNewOrderData({ ...newOrderData, instructions: e.target.value })}
                    placeholder="e.g. Extra hot, no sugar"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-white placeholder-neutral-600 focus:border-[#e2c569] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl border border-[#e2c569] bg-[#e2c569] py-3 font-cinzel font-bold text-xs text-black hover:brightness-110 shadow-md transition-all cursor-pointer"
                  >
                    SEND TO KITCHEN
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddOrderModal(false)}
                    className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-xs font-semibold text-neutral-300 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
