import api from "./api";

export const getInvoices = async () => {
  const { data } = await api.get("/invoices");
  return data;
};

export const createInvoice = async (invoiceData) => {
  const { data } = await api.post("/invoices", invoiceData);
  return data;
};

export const updateInvoice = async (id, invoiceData) => {
  const { data } = await api.put(`/invoices/${id}`, invoiceData);
  return data;
};

export const deleteInvoice = async (id) => {
  const { data } = await api.delete(`/invoices/${id}`);
  return data;
};

export const getRevenue = async () => {
  const { data } = await api.get("/invoices/revenue");
  return data;
};

export const downloadReceipt = async (id) => {
  window.open(
    `http://localhost:5000/api/invoices/${id}/download`,
    "_blank"
  );
};