import { useEffect, useState } from "react";
import { api } from "../api";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const initial = {
  vehicle: "",
  problem: "",
  serviceDate: "",
  status: "Pending",
  customerId: ""
};

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(initial);
  const [editing, setEditing] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [r, c] = await Promise.all([
        api.serviceRequests.all(),
        api.customers.all()
      ]);
      setRequests(r.serviceRequests || []);
      setCustomers(c.customers || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...initial, customerId: customers[0]?._id || "" });
    setModal(true);
  };

  const openEdit = (request) => {
    setEditing(request);
    setForm({
      vehicle: request.vehicle || "",
      problem: request.problem || "",
      serviceDate: request.serviceDate ? String(request.serviceDate).slice(0, 10) : "",
      status: request.status || "Pending",
      customerId: request.customerId?._id || request.customerId || ""
    });
    setModal(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editing) await api.serviceRequests.update(editing._id, form);
      else await api.serviceRequests.create(form);
      setModal(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this service request?")) return;
    try {
      await api.serviceRequests.remove(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <div><span className="eyebrow">SERVICE MANAGEMENT</span><h1>Service Requests</h1><p>Book and track your vehicle service requests.</p></div>
          <button className="btn btn-primary" onClick={openCreate}>+ New Request</button>
        </div>

        {error && <div className="alert error">{error}</div>}

        <div className="request-grid">
          {requests.map((request) => (
            <article className="request-card" key={request._id}>
              <div className="request-top">
                <div className="request-icon large">🔧</div>
                <StatusBadge status={request.status} />
              </div>
              <span className="eyebrow">SERVICE REQUEST</span>
              <h3>{request.problem || "Vehicle Service"}</h3>
              <div className="request-details">
                <span>🚗 {request.vehicle || "Vehicle not specified"}</span>
                <span>📅 {request.serviceDate ? new Date(request.serviceDate).toLocaleDateString() : "Date not set"}</span>
              </div>
              <div className="actions">
                <button className="table-btn" onClick={() => openEdit(request)}>Edit</button>
                <button className="table-btn danger" onClick={() => remove(request._id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>

        {requests.length === 0 && <div className="empty big-empty">No service requests yet. Book your first service.</div>}
      </div>

      {modal && (
        <Modal title={editing ? "Update Service Request" : "Book Service"} onClose={() => setModal(false)}>
          <form className="modal-form" onSubmit={save}>
            <label>Vehicle<input required value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} placeholder="Honda City" /></label>
            <label>Problem / Service Needed<textarea required value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} placeholder="Brake inspection, oil change..." /></label>
            <label>Service Date<input required type="date" value={form.serviceDate} onChange={(e) => setForm({ ...form, serviceDate: e.target.value })} /></label>
            <label>Status
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Pending</option><option>In Progress</option><option>Completed</option>
              </select>
            </label>
            <label>Customer
              <select required value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}>
                <option value="">Select customer</option>
                {customers.map((customer) => <option key={customer._id} value={customer._id}>{customer.name} — {customer.email}</option>)}
              </select>
            </label>
            <button className="btn btn-primary">Save Request</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
