import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";

import {
  DollarSign,
  Users,
  FileText,
  Clock,
} from "lucide-react";

import { getDashboardStats } from "../services/dashboardService";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setDashboard(data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!dashboard)
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Revenue"
          value={`$${dashboard.stats.revenue}`}
          icon={DollarSign}
          color="bg-green-500"
        />

        <StatCard
          title="Clients"
          value={dashboard.stats.totalClients}
          icon={Users}
          color="bg-blue-500"
        />

        <StatCard
          title="Invoices"
          value={dashboard.stats.totalInvoices}
          icon={FileText}
          color="bg-purple-500"
        />

        <StatCard
          title="Pending"
          value={dashboard.stats.pendingInvoices}
          icon={Clock}
          color="bg-orange-500"
        />

      </div>

    </DashboardLayout>
  );
}