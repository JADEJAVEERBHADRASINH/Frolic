import React from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Reports() {

  return (
    <>
      {/* REUSABLE NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <div style={{ padding: "110px 40px", background: "#f5f6f8", minHeight: "100vh" }}>

        <h3>Reports</h3>

        <ul className="list-group bg-white">

          <li className="list-group-item">
            Event-wise Report
          </li>

          <li className="list-group-item">
            Institute-wise Report
          </li>

          <li className="list-group-item">
            Winner Report
          </li>

        </ul>

      </div>

      {/* FOOTER */}
      <footer className="bg-white p-4 shadow-sm">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-4">
              <h5 className="text-primary">FROLIC</h5>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Frolic is a college-level cultural and technical event platform.
              </p>
            </div>

            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>Dashboard</li>
                <li>Institutes</li>
                <li>Events</li>
                <li>Reports</li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5>Contact</h5>
              <p>Email: frolic@darshan.ac.in</p>
              <p>Phone: +91 98765 43210</p>
            </div>

          </div>

          <div className="text-center mt-3" style={{ fontSize: "13px", color: "#888" }}>
            © 2026 Frolic Event Management System
          </div>
        </div>
      </footer>

    </>
  );
}

export default Reports;