import Layout from "../components/common/Layout";

export default function AdminDashboard() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to VaultPay Financial Core
        </p>
      </div>
    </Layout>
  );
}