import { LayoutDashboard, FileText, Users, CreditCard, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Invoices",
    path: "/admin/invoices",
    icon: FileText,
  },
  {
    title: "Clients",
    path: "/admin/clients",
    icon: Users,
  },
  {
    title: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        VaultPay
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800"
          >
            <item.icon size={20} />
            {item.title}
          </NavLink>
        ))}
      </nav>

      <button className="m-4 flex items-center gap-3 rounded-lg bg-red-600 p-3 hover:bg-red-700">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}