import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ background: "#f5f6f8", padding: "40px 20px" }}>
      
      <div className="container-fluid">
        <div className="row">

         
          <div className="col-md-4">
            <h4 className="text-primary">FROLIC</h4>
            <p style={{ color: "#555" }}>
              Frolic is a college-level cultural and technical event platform.
            </p>
          </div>

         
          <div className="col-md-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark text-decoration-none">Dashboard</Link></li>
              <li><Link to="/institutes" className="text-dark text-decoration-none">Institutes</Link></li>
              <li><Link to="/events" className="text-dark text-decoration-none">Events</Link></li>
              <li><Link to="/users" className="text-dark text-decoration-none">Users</Link></li>
            </ul>
          </div>

          
          <div className="col-md-4">
            <h4>Contact</h4>
            <p>Email: frolic@darshan.ac.in</p>
            <p>Phone: +91 98765 43210</p>
          </div>

        </div>

        
        <div className="text-center mt-4" style={{ fontSize: "14px", color: "#777" }}>
          © 2026 Frolic Event Management System
        </div>
      </div>

    </footer>
  );
}

export default Footer;