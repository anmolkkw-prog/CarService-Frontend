import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [vehicleData, requestData] = await Promise.all([
        api.vehicles.all(),
        api.serviceRequests.all()
      ]);
      setVehicles(vehicleData.vehicles || []);
      setRequests(requestData.serviceRequests || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const upcoming = useMemo(
    () => requests.filter((r) => String(r.status).toLowerCase() !== "completed").length,
    [requests]
  );

  if (loading) return <div className="page-loading">Loading dashboard...</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="dashboard-head">
          <div>
            <span className="eyebrow">YOUR GARAGE</span>
            <h1>Good to see you, {user?.name || "Driver"}.</h1>
            <p>Everything you need to keep your vehicles road-ready.</p>
          </div>
          <Link className="btn btn-primary" to="/service-requests">+ Book Service</Link>
        </div>

        {error && <div className="alert error">{error}</div>}

        <div className="metric-grid">
          <div className="metric-card"><span>🚘</span><div><b>{vehicles.length}</b><small>Total Vehicles</small></div></div>
          <div className="metric-card"><span>🛠</span><div><b>{requests.length}</b><small>Service Requests</small></div></div>
          <div className="metric-card"><span>⏱</span><div><b>{upcoming}</b><small>Active Requests</small></div></div>
          <div className="metric-card accent"><span>✦</span><div><b>{isAdmin ? "Admin" : "Member"}</b><small>Account Access</small></div></div>
        </div>

        <div className="dashboard-grid">
          <section className="panel">
            <div className="panel-head">
              <div><h2>My Vehicles</h2><p>Your registered vehicles</p></div>
              <Link to="/vehicles">View all →</Link>
            </div>

            {vehicles.length === 0 ? (
              <Empty text="No vehicles added yet." link="/vehicles" action="Add your first vehicle" />
            ) : (
              <div className="list">
                {vehicles.slice(0, 4).map((vehicle) => (
                  <div className="list-row" key={vehicle._id}>
                    <div className="vehicle-thumb">🚗</div>
                    <div className="grow">
                      <b>{vehicle.model}</b>
                      <span>{vehicle.vehicleNumber} • {vehicle.vehicleType}</span>
                    </div>
                    <span className="pill">Registered</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel-head">
              <div><h2>Recent Service Requests</h2><p>Latest activity</p></div>
              <Link to="/service-requests">View all →</Link>
            </div>

            {requests.length === 0 ? (
              <Empty text="No service requests yet." link="/service-requests" action="Request service" />
            ) : (
              <div className="list">
                {requests.slice(0, 4).map((request) => (
                  <div className="list-row" key={request._id}>
                    <div className="request-icon">✦</div>
                    <div className="grow">
                      <b>{request.problem || "Vehicle Service"}</b>
                      <span>{request.vehicle || "Vehicle"} • {request.serviceDate ? new Date(request.serviceDate).toLocaleDateString() : "Date not set"}</span>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="dashboard-banner">
          <div>
            <span className="eyebrow">PREMIUM CARE</span>
            <h2>Your car. Your records. One dashboard.</h2>
            <p>Keep every vehicle and service request organized in one secure place.</p>
          </div>
          <Link className="btn btn-light" to="/vehicles">Manage Garage →</Link>
        </section>
      </div>
    </div>
  );
}

function Empty({ text, action, link }) {
  return (
    <div className="empty">
      <div>🚘</div>
      <p>{text}</p>
      <Link to={link}>{action} →</Link>
    </div>
  );
}
