import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import Invoices from "./pages/Invoices";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/403" element={<Unauthorized />} />
      <Route path="/test" element={<h1>TEST PAGE</h1>} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/invoices"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Invoices />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}