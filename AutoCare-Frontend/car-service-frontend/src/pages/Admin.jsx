import { useEffect, useState } from "react";
import { api } from "../api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.admin.users()
      .then((data) => setUsers(data.users || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <div>
            <span className="eyebrow">ADMIN CONTROL</span>
            <h1>Admin Dashboard</h1>
            <p>Manage and review registered AutoCare users.</p>
          </div>
          <span className="admin-badge">ADMIN ACCESS</span>
        </div>

        {error && <div className="alert error">{error}</div>}

        <div className="admin-stat">
          <span>👥</span>
          <div><b>{users.length}</b><small>Registered Users</small></div>
        </div>

        <div className="table-card">
          <table>
            <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td><b>{user.name}</b></td>
                  <td>{user.email}</td>
                  <td><span className={`role role-${user.role}`}>{user.role}</span></td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
