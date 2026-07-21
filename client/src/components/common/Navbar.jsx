import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-sm">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border px-3 py-2">
          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none"
          />
        </div>

        <Bell className="cursor-pointer" />

        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="h-10 w-10 rounded-full"
        />
      </div>
    </header>
  );
}