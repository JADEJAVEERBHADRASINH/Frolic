import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {

  const [institutesCount, setInstitutesCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [groupsCount, setGroupsCount] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);

  useEffect(() => {

    fetch("http://localhost:3000/department")
      .then(res => res.json())
      .then(data => setInstitutesCount(data.length));

    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(data => setEventsCount(data.length));

    fetch("http://localhost:3000/groups")
      .then(res => res.json())
      .then(data => setGroupsCount(data.length));

    fetch("http://localhost:3000/participants")
      .then(res => res.json())
      .then(data => setParticipantsCount(data.length));

  }, []);

  return (
    <>
      {/* REUSABLE NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <div style={{ padding: "110px 40px 40px", background: "#f5f6f8", minHeight: "100vh" }}>

        <div style={{ fontSize: "28px", fontWeight: "600", marginBottom: "30px" }}>
          Dashboard
        </div>

        <div className="row g-4">

          <div className="col-md-3">
            <div className="p-4 text-white rounded shadow" style={{ background: "#0d6efd" }}>
              <h6>Total Institutes</h6>
              <h2>{institutesCount}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 text-white rounded shadow" style={{ background: "#198754" }}>
              <h6>Active Events</h6>
              <h2>{eventsCount}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 rounded shadow" style={{ background: "#ffc107" }}>
              <h6>Registered Groups</h6>
              <h2>{groupsCount}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 text-white rounded shadow" style={{ background: "#dc3545" }}>
              <h6>Total Participants</h6>
              <h2>{participantsCount}</h2>
            </div>
          </div>

        </div>

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
                <li>Users</li>
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

export default Dashboard;