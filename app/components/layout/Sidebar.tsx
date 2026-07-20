import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  Wallet,
  Megaphone,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    hasChildren: false,
  },
  { label: "Product", href: "#", icon: Package, hasChildren: true },
  { label: "Customers", href: "/dashboard", icon: Users, hasChildren: true },
  { label: "Income", href: "#", icon: Wallet, hasChildren: true },
  { label: "Promote", href: "#", icon: Megaphone, hasChildren: true },
  { label: "Help", href: "#", icon: HelpCircle, hasChildren: true },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col justify-between">
      <div>
        <div className="px-6 py-6">
          <span className="text-lg font-bold text-black/60">Dashboard</span>
        </div>

        <nav className="px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === "Customers"; // static — Customers is the only real route
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {item.label}
                </span>
                {item.hasChildren && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <div className="rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 p-4 text-white text-sm">
          <p className="font-medium mb-1">Upgrade to PRO</p>
          <p className="text-white/80 text-xs mb-3">
            to get access all Features!
          </p>
          <button className="w-full bg-white text-indigo-600 rounded-lg py-2 text-xs font-medium">
            Get Pro Now!
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4 px-2">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="text-xs">
            <p className="font-medium">Evano</p>
            <p className="text-gray-400">Project Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
