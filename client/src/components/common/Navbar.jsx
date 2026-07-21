import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            VaultPay
          </h1>

          <p className="text-xs text-slate-500">
            Financial Core
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Bell className="cursor-pointer text-slate-500 hover:text-blue-600" />

          <div className="flex items-center gap-3">
            <UserCircle size={34} className="text-blue-600" />

            <div>
              <h3 className="font-semibold">
                {user?.name || "Guest"}
              </h3>

              <p className="text-sm capitalize text-slate-500">
                {user?.role || ""}
              </p>
            </div>
          </div>

          {user && (
            <button
              onClick={logout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}