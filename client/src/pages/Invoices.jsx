import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getInvoices } from "../services/invoiceService";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await getInvoices();
      setInvoices(data.invoices);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Invoice Management
        </h1>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white">
          + Create Invoice
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="border-b"
              >
                <td className="p-4">
                  {invoice.invoiceNumber}
                </td>

                <td className="p-4">
                  {invoice.client?.name}
                </td>

                <td className="p-4">
                  ${invoice.amount}
                </td>

                <td className="p-4">
                  {invoice.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}