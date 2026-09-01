import { Link } from "react-router-dom";

const heroImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85";

const serviceImages = [
  "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
];

export default function Home() {
  return (
    <>
      <section className="hero" style={{ "--hero": `url(${heroImage})` }}>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">TRUSTED VEHICLE CARE</span>
            <h1>
              Keep your car
              <br />
              <span>performing at its best.</span>
            </h1>
            <p>
              Reliable servicing, transparent care and a smoother ownership
              experience — all in one place.
            </p>

            <div className="hero-buttons">
              <Link className="btn btn-primary btn-lg" to="/register">
                Book a Service →
              </Link>
              <a className="btn btn-light btn-lg" href="#services">
                Explore Services
              </a>
            </div>

            <div className="trust-row">
              <div><b>5000+</b><span>Happy Customers</span></div>
              <div><b>120+</b><span>Services Offered</span></div>
              <div><b>4.9/5</b><span>Customer Rating</span></div>
            </div>
          </div>

          <div className="hero-booking">
            <span className="eyebrow">QUICK START</span>
            <h2>Book your service</h2>
            <p>Sign in to manage your vehicle and request service.</p>
            <Link className="btn btn-primary btn-block" to="/login">
              Start Booking
            </Link>
            <Link className="btn btn-dark btn-block" to="/register">
              Create Account
            </Link>
            <div className="mini-note">Secure account • Service history • Vehicle management</div>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div><span>01</span><b>Expert Care</b><small>Professional service workflow</small></div>
        <div><span>02</span><b>Clear Updates</b><small>Track every service request</small></div>
        <div><span>03</span><b>Vehicle Records</b><small>Keep your cars organized</small></div>
        <div><span>04</span><b>Fast Support</b><small>Simple customer experience</small></div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT WE DO</span>
              <h2>Care for every part of your car.</h2>
            </div>
            <p>From routine maintenance to problem diagnosis, keep your vehicle ready for the road.</p>
          </div>

          <div className="service-grid">
            {[
              ["Routine Service", "Oil, fluids, filters and scheduled maintenance.", serviceImages[0]],
              ["Inspection & Repairs", "Identify problems early and get the right service.", serviceImages[1]],
              ["Performance Care", "Keep your vehicle responsive, reliable and road-ready.", serviceImages[2]]
            ].map(([title, text, image]) => (
              <article className="service-card" key={title}>
                <img src={image} alt={title} />
                <div>
                  <span className="card-number">0{serviceImages.indexOf(image) + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link to="/register">Get Started →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section" id="why-us">
        <div className="container split-section">
          <div>
            <span className="eyebrow">WHY AUTOCARE</span>
            <h2>A better way to manage your car service.</h2>
            <p>
              Your customer account brings vehicles, service requests and
              service status together so you always know what is happening.
            </p>

            <div className="check-list">
              <div>✓ Manage multiple vehicles</div>
              <div>✓ Request vehicle service online</div>
              <div>✓ Track service request status</div>
              <div>✓ Secure login with JWT authentication</div>
            </div>

            <Link className="btn btn-primary" to="/register">Join AutoCare</Link>
          </div>

          <div className="stats-panel">
            <div><strong>01</strong><span>Register your account</span></div>
            <div><strong>02</strong><span>Add your vehicle</span></div>
            <div><strong>03</strong><span>Request a service</span></div>
            <div><strong>04</strong><span>Track the progress</span></div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-card">
          <div>
            <span className="eyebrow">READY WHEN YOU ARE</span>
            <h2>Your car deserves better care.</h2>
            <p>Create your account and manage your vehicle service in one place.</p>
          </div>
          <Link className="btn btn-primary btn-lg" to="/register">Create Account →</Link>
        </div>
      </section>
    </>
  );
}
