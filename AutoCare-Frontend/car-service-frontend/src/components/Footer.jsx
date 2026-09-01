export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="brand footer-brand">
          <span className="brand-mark">A</span>
          <span>
            <strong>AutoCare</strong>
            <small>PREMIUM CAR SERVICE</small>
          </span>
        </div>
        <p>Professional vehicle care designed around your car and your time.</p>
      </div>

      <div>
        <h4>Services</h4>
        <p>Routine Service</p>
        <p>Brake Inspection</p>
        <p>Engine Diagnostics</p>
      </div>

      <div>
        <h4>Contact</h4>
        <p>+91 98765 43210</p>
        <p>support@autocare.local</p>
      </div>

      <div>
        <h4>Hours</h4>
        <p>Mon–Sat: 8:00 AM – 8:00 PM</p>
        <p>Sunday: 9:00 AM – 4:00 PM</p>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} AutoCare. All rights reserved.
      </div>
    </footer>
  );
}
