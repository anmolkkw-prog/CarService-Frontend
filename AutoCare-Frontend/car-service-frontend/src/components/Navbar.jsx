import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">A</span>
        <span>
          <strong>AutoCare</strong>
          <small>PREMIUM CAR SERVICE</small>
        </span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <a href="/#services">Services</a>
        <a href="/#why-us">Why Us</a>

        {isAuthenticated && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/vehicles">Vehicles</NavLink>
            <NavLink to="/service-requests">Service Requests</NavLink>
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          </>
        )}
      </nav>

      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="user-chip">{user?.role || "customer"}</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
