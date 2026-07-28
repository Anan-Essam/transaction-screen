import userSarah from "./assets/settings/userSarah.jpg";
import userMohamed from "./assets/settings/userMohamed.jpg";
import userAli from "./assets/settings/userAli.jpg";
import userFatima from "./assets/settings/userFatima.jpg";
import userAhmed from "./assets/settings/userAhmed.jpg";

/* ---------------------------------------------------------------------------
   Roles

   There is no backend, so the role is decided by which mock phone number was
   used to sign in (see lookupRole below). Admin-only areas are not rendered at
   all for a regular user — they are absent from the DOM, not disabled.
--------------------------------------------------------------------------- */
export type UserRole = "admin" | "user";

/* 01000000001 (the "existing account" test number) signs in as Admin,
   01000000002 (the "new account" test number) signs in as a regular user.
   A `?role=admin|user` query parameter overrides it for quick manual testing. */
export function lookupRole(phone: string): UserRole {
  return phone.replace(/\D/g, "") === "01000000001" ? "admin" : "user";
}

export function roleOverrideFromUrl(): UserRole | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("role");
  return value === "admin" || value === "user" ? value : null;
}

/* ---------------------------------------------------------------------------
   Account Information
--------------------------------------------------------------------------- */
export type CompanyInfo = {
  name: string;
  businessEmail: string;
  phone: string;
  country: string;
  city: string;
  employees: string;
  industry: string;
  vatNumber: string;
};

export type UserInfo = {
  fullName: string;
  jobTitle: string;
  nationalId: string;
  email: string;
  phone: string;
};

export type AdminInfo = { name: string; title: string };

export const INITIAL_COMPANY: CompanyInfo = {
  name: "EcoWaste Solutions Ltd.",
  businessEmail: "contact@ecowaste-solutions.com",
  phone: "+971 4 123 4567",
  country: "United Arab Emirates",
  city: "Dubai",
  employees: "50-100",
  industry: "Waste Management & Recycling",
  vatNumber: "AE123456789012345",
};

export const INITIAL_USER: UserInfo = {
  fullName: "Ahmed Al-Mansouri",
  jobTitle: "Procurement Manager",
  nationalId: "A12345678",
  email: "ahmed.almansouri@ecowaste-solutions.com",
  phone: "+971 50 123 4567",
};

export const ADMIN_INFO: AdminInfo = { name: "Ahmed Al-Mansouri", title: "Manager" };

/* Option lists for the Edit Info popups */
export const COUNTRY_OPTIONS = ["United Arab Emirates", "Egypt", "Saudi Arabia", "Qatar", "Kuwait", "Jordan"];
export const CITY_OPTIONS: Record<string, string[]> = {
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Port Said"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam"],
  Qatar: ["Doha", "Al Rayyan"],
  Kuwait: ["Kuwait City", "Hawalli"],
  Jordan: ["Amman", "Zarqa"],
};
export const EMPLOYEE_RANGE_OPTIONS = ["1 - 10", "10 - 50", "50-100", "100 - 200", "200 - 500", "500+"];
export const INDUSTRY_OPTIONS = [
  "Waste Management & Recycling",
  "Manufacturing",
  "Retail & Wholesale",
  "Construction",
  "Logistics & Transport",
  "Electronics",
  "Hospitality",
];

/* ---------------------------------------------------------------------------
   Official Documents (KYC) — Admin only
--------------------------------------------------------------------------- */
export type KycDocument = {
  id: string;
  label: string;
  /* null while nothing has been uploaded — the row renders its upload state */
  fileName: string | null;
};

export const INITIAL_KYC_DOCS: KycDocument[] = [
  { id: "trade-license", label: "Trade License / Commercial Register", fileName: null },
  { id: "tax-card", label: "Tax Card / VAT Certificate", fileName: "tax-card.pdf" },
  { id: "bank-statement", label: "Company Bank Statement", fileName: "bank-statement.pdf" },
  { id: "address-proof", label: "Proof of Company Address (Utility Bill / Lease Agreement)", fileName: "lease-agreement.pdf" },
];

/* ---------------------------------------------------------------------------
   Sites
--------------------------------------------------------------------------- */
export type Site = {
  id: string;
  name: string;
  /* "Egypt / Cairo" — shown under the site name in the collapsed row */
  region: string;
  permanence: "permanent site" | "temporary Site";
  status: "Active" | "Inactive";
  location: string;
  workingFrom: string;
  workingTo: string;
  contactName?: string;
  contactPosition?: string;
  contactPhone?: string;
};

export const WEEK_DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const INITIAL_SITES: Site[] = [
  {
    id: "site-1",
    name: "Dell Alexandria Depot",
    region: "Egypt / Cairo",
    permanence: "permanent site",
    status: "Active",
    location: "Egypt / Cairo, 15 May City",
    workingFrom: "Sunday",
    workingTo: "Thursday",
    contactName: "Anan Essam",
    contactPosition: "Site Manager",
    contactPhone: "01021587912",
  },
  {
    id: "site-2",
    name: "Dell Cairo Recycling Hub",
    region: "Egypt / Cairo",
    permanence: "permanent site",
    status: "Active",
    location: "Egypt / Cairo, Nasr City",
    workingFrom: "Saturday",
    workingTo: "Wednesday",
    contactName: "Mona Fathy",
    contactPosition: "Operations Lead",
    contactPhone: "01021587913",
  },
  {
    id: "site-3",
    name: "Dell Cairo 2 Recycling Hub",
    region: "Egypt / Cairo",
    permanence: "temporary Site",
    status: "Active",
    location: "Egypt / Cairo, 6th of October",
    workingFrom: "Sunday",
    workingTo: "Thursday",
    contactName: "Karim Adel",
    contactPosition: "Site Manager",
    contactPhone: "01021587914",
  },
  {
    id: "site-4",
    name: "Dell Texas HQ Storage",
    region: "Egypt / Cairo",
    permanence: "permanent site",
    status: "Active",
    location: "Egypt / Cairo, Maadi",
    workingFrom: "Monday",
    workingTo: "Friday",
    contactName: "Sara Nabil",
    contactPosition: "Warehouse Keeper",
    contactPhone: "01021587915",
  },
  {
    id: "site-5",
    name: "Dell Alexandria Port Yard",
    region: "Egypt / Alexandria",
    permanence: "temporary Site",
    status: "Inactive",
    location: "Egypt / Alexandria, Miami",
    workingFrom: "Sunday",
    workingTo: "Tuesday",
    contactName: "Hossam Ali",
    contactPosition: "Field Supervisor",
    contactPhone: "01021587916",
  },
  {
    id: "site-6",
    name: "Dell Giza Transfer Station",
    region: "Egypt / Giza",
    permanence: "permanent site",
    status: "Active",
    location: "Egypt / Giza, Sheikh Zayed",
    workingFrom: "Saturday",
    workingTo: "Thursday",
    contactName: "Nour Hassan",
    contactPosition: "Site Manager",
    contactPhone: "01021587917",
  },
];

export const SITE_FILTER_OPTIONS = ["All sites", "permanent site", "temporary Site"];

/* ---------------------------------------------------------------------------
   Security & Access
--------------------------------------------------------------------------- */
export type ActiveSession = {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
};

export type LoginHistoryEntry = {
  id: string;
  dateTime: string;
  ipAddress: string;
  location: string;
  device: string;
};

export const INITIAL_SESSIONS: ActiveSession[] = [
  { id: "sess-1", device: "MacBook Pro", browser: "Chrome 120.0", location: "Cairo, Egypt", lastActive: "Active now", current: true },
  { id: "sess-2", device: "Windows PC", browser: "Edge 119.0", location: "Alexandria, Egypt", lastActive: "1 day ago", current: false },
];

export const LOGIN_HISTORY: LoginHistoryEntry[] = [
  { id: "log-1", dateTime: "Oct 10, 2025 - 2:30 PM", ipAddress: "192.168.1.105", location: "Cairo, Egypt", device: "MacBook Pro" },
  { id: "log-2", dateTime: "Oct 10, 2025 - 10:15 AM", ipAddress: "192.168.1.105", location: "Cairo, Egypt", device: "Windows PC" },
  { id: "log-3", dateTime: "Oct 09, 2025 - 6:45 PM", ipAddress: "41.234.56.78", location: "Alexandria, Egypt", device: "Chrome Browser" },
  { id: "log-4", dateTime: "Oct 08, 2025 - 11:20 PM", ipAddress: "89.123.45.67", location: "Cairo, Egypt", device: "MacBook Pro" },
  { id: "log-5", dateTime: "Oct 07, 2025 - 9:05 AM", ipAddress: "41.234.56.78", location: "Giza, Egypt", device: "iPhone 14" },
  { id: "log-6", dateTime: "Oct 06, 2025 - 4:40 PM", ipAddress: "192.168.1.105", location: "Cairo, Egypt", device: "MacBook Pro" },
];

export type SecurityPreferences = {
  loginNotifications: boolean;
  autoLogout: boolean;
  suspiciousActivityAlerts: boolean;
};

export const INITIAL_SECURITY_PREFS: SecurityPreferences = {
  loginNotifications: true,
  autoLogout: false,
  suspiciousActivityAlerts: true,
};

/* Password rules listed under the New Password field */
export const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /\d/.test(v) },
  { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

/* ---------------------------------------------------------------------------
   Notification Preferences
--------------------------------------------------------------------------- */
export type NotificationChannel = "inApp" | "email" | "sms";

export type NotificationRow = {
  id: string;
  title: string;
  description: string;
  channels: Record<NotificationChannel, boolean>;
};

export type NotificationGroup = {
  id: string;
  title: string;
  /* the Account Security group uses the brand blue for its "on" state in Figma;
     every other group uses green */
  tone: "green" | "blue";
  rows: NotificationRow[];
};

export const NOTIFICATION_CHANNELS: { key: NotificationChannel; label: string }[] = [
  { key: "inApp", label: "In-App" },
  { key: "email", label: "Email" },
  { key: "sms", label: "SMS" },
];

export const INITIAL_NOTIFICATIONS: NotificationGroup[] = [
  {
    id: "auction-events",
    title: "Auction Events",
    tone: "green",
    rows: [
      {
        id: "new-bid",
        title: "New Bid Received",
        description: "When someone places a bid on your items",
        channels: { inApp: false, email: true, sms: false },
      },
      { id: "auction-won", title: "Auction Won", description: "When you win an auction", channels: { inApp: true, email: false, sms: true } },
      {
        id: "auction-closing",
        title: "Auction Closing Soon",
        description: "24 hours before auction ends",
        channels: { inApp: false, email: true, sms: true },
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Withdrawals",
    tone: "green",
    rows: [
      {
        id: "payment-received",
        title: "Payment Received",
        description: "When you receive payment for sold items",
        channels: { inApp: true, email: false, sms: false },
      },
      {
        id: "withdrawal-processed",
        title: "Withdrawal Processed",
        description: "When your withdrawal request is completed",
        channels: { inApp: false, email: true, sms: true },
      },
    ],
  },
  {
    id: "product-library",
    title: "Product Library",
    tone: "green",
    rows: [
      {
        id: "new-items",
        title: "New Items Added",
        description: "When new items are added to inventory",
        channels: { inApp: true, email: false, sms: true },
      },
    ],
  },
  {
    id: "account-security",
    title: "Account Security",
    tone: "blue",
    rows: [
      {
        id: "suspicious-login",
        title: "Suspicious Login Attempts",
        description: "When unusual login activity is detected",
        channels: { inApp: false, email: true, sms: false },
      },
      {
        id: "password-changes",
        title: "Password Changes",
        description: "When your password is changed",
        channels: { inApp: true, email: false, sms: true },
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
   Users & Roles — Admin only
--------------------------------------------------------------------------- */
export type TeamRole = "Owner" | "Admin" | "Site Manager" | "Inventory Manager" | "Kyc Manager";
export type TeamMemberStatus = "Active" | "Suspended";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: TeamMemberStatus;
  lastLogin: string;
  avatar: string;
};

export const TEAM_ROLES: TeamRole[] = ["Owner", "Admin", "Site Manager", "Inventory Manager", "Kyc Manager"];

/* Role pill colours, straight from the Users & Roles frame */
export const ROLE_PILL: Record<TeamRole, { bg: string; text: string }> = {
  Owner: { bg: "rgba(27,158,116,0.1)", text: "#1b9e74" },
  Admin: { bg: "rgba(232,150,29,0.1)", text: "#e8961d" },
  "Site Manager": { bg: "rgba(126,87,194,0.1)", text: "#7e57c2" },
  "Inventory Manager": { bg: "rgba(40,69,157,0.1)", text: "#28459d" },
  "Kyc Manager": { bg: "rgba(19,19,19,0.06)", text: "rgba(19,19,19,0.7)" },
};

export const INITIAL_TEAM: TeamMember[] = [
  { id: "tm-1", name: "Sarah Ahmed", email: "sarah.ahmed@bekia.com", role: "Owner", status: "Active", lastLogin: "2 hours ago", avatar: userSarah },
  { id: "tm-2", name: "Mohamed Hassan", email: "mohamed.hassan@bekia.com", role: "Admin", status: "Active", lastLogin: "1 day ago", avatar: userMohamed },
  { id: "tm-3", name: "Ali Mansour", email: "ali.mansour@bekia.com", role: "Site Manager", status: "Active", lastLogin: "3 hours ago", avatar: userAli },
  { id: "tm-4", name: "Fatima El-Sayed", email: "fatima.elsayed@bekia.com", role: "Inventory Manager", status: "Suspended", lastLogin: "2 weeks ago", avatar: userFatima },
  { id: "tm-5", name: "Ahmed Khalil", email: "ahmed.khalil@bekia.com", role: "Admin", status: "Active", lastLogin: "5 hours ago", avatar: userAhmed },
];

export type RolePermissionCard = {
  role: TeamRole;
  description: string;
  permissions: { label: string; allowed: boolean }[];
};

export const ROLE_PERMISSIONS: RolePermissionCard[] = [
  {
    role: "Owner",
    description: "Full access to all features and settings. Cannot be edited or deleted.",
    permissions: [
      { label: "All permissions", allowed: true },
      { label: "Billing & ownership", allowed: true },
      { label: "Team management", allowed: true },
    ],
  },
  {
    role: "Admin",
    description: "Manage everything except billing and ownership transfer.",
    permissions: [
      { label: "Manage auctions", allowed: true },
      { label: "Manage inventory", allowed: true },
      { label: "User management", allowed: true },
    ],
  },
  {
    role: "Site Manager",
    description: "Manage site inventory and auctions for assigned locations.",
    permissions: [
      { label: "Site inventory", allowed: true },
      { label: "Create auctions", allowed: true },
      { label: "User management", allowed: false },
    ],
  },
  {
    role: "Inventory Manager",
    description: "Manage stock and inventory items only.",
    permissions: [
      { label: "Add/edit items", allowed: true },
      { label: "View inventory", allowed: true },
      { label: "Create auctions", allowed: false },
    ],
  },
  {
    role: "Kyc Manager",
    description: "View reports and analytics only.",
    permissions: [
      { label: "View reports", allowed: true },
      { label: "Export data", allowed: true },
      { label: "Edit anything", allowed: false },
    ],
  },
];

export function roleUserCount(team: TeamMember[], role: TeamRole) {
  return team.filter((m) => m.role === role).length;
}
