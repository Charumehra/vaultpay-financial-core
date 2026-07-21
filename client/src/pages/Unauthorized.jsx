import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-6">
      <ShieldAlert size={80} className="text-red-500" />

      <h1 className="mt-6 text-4xl font-bold text-slate-800">
        403 - Unauthorized
      </h1>

      <p className="mt-3 text-center text-slate-600">
        You don't have permission to access this page.
      </p>

      <Link
        to="/login"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Back to Login
      </Link>
    </div>
  );
}