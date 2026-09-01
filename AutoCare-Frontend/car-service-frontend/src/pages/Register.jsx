import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form);
      navigate("/login", {
        state: { message: "Account created. Please sign in." }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual register-visual">
        <div>
          <span className="eyebrow">START YOUR JOURNEY</span>
          <h1>One account.<br />Complete car care.</h1>
          <p>Add your vehicles, request service and track everything in one place.</p>
        </div>
      </div>

      <div className="auth-form-wrap">
        <form className="auth-card" onSubmit={submit}>
          <span className="eyebrow">CREATE ACCOUNT</span>
          <h2>Join AutoCare</h2>
          <p className="muted">Set up your account in less than a minute.</p>

          {error && <div className="alert error">{error}</div>}

          <label>Full Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />

          <label>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />

          <label>Password</label>
          <input
            type="password"
            required
            minLength="6"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Minimum 6 characters"
          />

          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="auth-switch">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
