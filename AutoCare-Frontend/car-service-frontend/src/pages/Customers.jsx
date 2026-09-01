import { useEffect, useState } from "react";
import { api } from "../api";
import Modal from "../components/Modal";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await api.customers.all();
      setCustomers(data.customers || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", email: "", phone: "", address: "" });
    setModal(true);
  };

  const openEdit = (customer) => {
    setEditing(customer);
    setForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || ""
    });
    setModal(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editing) await api.customers.update(editing._id, form);
      else await api.customers.create(form);
      setModal(false);
      setMessage(editing ? "Customer updated." : "Customer created.");
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try {
      await api.customers.remove(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <PageHead
          eyebrow="CUSTOMER MANAGEMENT"
          title="Customers"
          text="Manage customer records connected to your service system."
          action="+ Add Customer"
          onAction={openCreate}
        />

        {message && <div className="alert success">{message}</div>}
        {error && <div className="alert error">{error}</div>}

        <div className="table-card">
          <table>
            <thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th></tr></thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td><b>{customer.name}</b></td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button className="table-btn" onClick={() => openEdit(customer)}>Edit</button>
                    <button className="table-btn danger" onClick={() => remove(customer._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 && <div className="empty table-empty">No customers found.</div>}
        </div>
      </div>

      {modal && (
        <Modal title={editing ? "Edit Customer" : "Add Customer"} onClose={() => setModal(false)}>
          <form className="modal-form" onSubmit={save}>
            <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label>Phone<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
            <label>Address<textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></label>
            <button className="btn btn-primary">Save Customer</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function PageHead({ eyebrow, title, text, action, onAction }) {
  return (
    <div className="page-head">
      <div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>
      <button className="btn btn-primary" onClick={onAction}>{action}</button>
    </div>
  );
}
