import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const adminLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Invoices",
      icon: FileText,
      path: "/admin/invoices",
    },
    {
      name: "Clients",
      icon: Users,
      path: "/admin/clients",
    },
    {
      name: "Payments",
      icon: CreditCard,
      path: "/admin/payments",
    },
  ];

  const clientLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/client/dashboard",
    },
    {
      name: "My Invoices",
      icon: FileText,
      path: "/client/invoices",
    },
    {
      name: "Payments",
      icon: CreditCard,
      path: "/client/payments",
    },
  ];

  const links =
    user?.role === "admin"
      ? adminLinks
      : clientLinks;

  return (
    <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r bg-white md:block">
      <div className="space-y-2 p-4">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-blue-50"
              }`
            }
          >
            <item.icon size={20} />

            {item.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}