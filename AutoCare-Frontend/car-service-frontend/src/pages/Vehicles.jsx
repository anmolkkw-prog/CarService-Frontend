import { useEffect, useState } from "react";
import { api } from "../api";
import Modal from "../components/Modal";

const initial = { vehicleNumber: "", vehicleType: "Car", model: "", customerId: "" };

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(initial);
  const [editing, setEditing] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [v, c] = await Promise.all([api.vehicles.all(), api.customers.all()]);
      setVehicles(v.vehicles || []);
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

  const openEdit = (vehicle) => {
    setEditing(vehicle);
    setForm({
      vehicleNumber: vehicle.vehicleNumber || "",
      vehicleType: vehicle.vehicleType || "Car",
      model: vehicle.model || "",
      customerId: vehicle.customerId?._id || vehicle.customerId || ""
    });
    setModal(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editing) await api.vehicles.update(editing._id, form);
      else await api.vehicles.create(form);
      setModal(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this vehicle?")) return;
    try {
      await api.vehicles.remove(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <div><span className="eyebrow">YOUR GARAGE</span><h1>Vehicles</h1><p>Keep your registered vehicles organized.</p></div>
          <button className="btn btn-primary" onClick={openCreate}>+ Add Vehicle</button>
        </div>

        {error && <div className="alert error">{error}</div>}

        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <article className="vehicle-card" key={vehicle._id}>
              <div className="vehicle-photo">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80"
                  alt="Vehicle"
                />
                <span>{vehicle.vehicleType}</span>
              </div>
              <div className="vehicle-info">
                <div><span className="eyebrow">REGISTERED VEHICLE</span><h3>{vehicle.model}</h3></div>
                <div className="vehicle-meta"><span>Plate</span><b>{vehicle.vehicleNumber}</b></div>
                <div className="vehicle-meta"><span>Customer ID</span><b>{String(vehicle.customerId?._id || vehicle.customerId).slice(0, 10)}...</b></div>
                <div className="actions">
                  <button className="table-btn" onClick={() => openEdit(vehicle)}>Edit</button>
                  <button className="table-btn danger" onClick={() => remove(vehicle._id)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {vehicles.length === 0 && <div className="empty big-empty">No vehicles yet. Add your first vehicle to start booking services.</div>}
      </div>

      {modal && (
        <Modal title={editing ? "Edit Vehicle" : "Add Vehicle"} onClose={() => setModal(false)}>
          <form className="modal-form" onSubmit={save}>
            <label>Vehicle Number<input required value={form.vehicleNumber} onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })} placeholder="KA01AB1234" /></label>
            <label>Vehicle Type
              <select value={form.vehicleType} onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}>
                <option>Car</option><option>Bike</option><option>SUV</option><option>Other</option>
              </select>
            </label>
            <label>Model<input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Honda City" /></label>
            <label>Customer
              <select required value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}>
                <option value="">Select customer</option>
                {customers.map((customer) => <option key={customer._id} value={customer._id}>{customer.name} — {customer.email}</option>)}
              </select>
            </label>
            <button className="btn btn-primary">Save Vehicle</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
