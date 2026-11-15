import React, { useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Winners() {

  const [eventName, setEventName] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");

  // SAVE WINNERS
  const saveWinners = () => {

    if (!eventName || !first) {
      alert("Please fill required fields");
      return;
    }

    fetch("http://localhost:3000/winners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName,
        first,
        second,
        third
      })
    })
    .then(() => {
      alert("Winners Saved");

      // CLEAR FORM
      setEventName("");
      setFirst("");
      setSecond("");
      setThird("");
    })
    .catch(() => {
      alert("Error saving winners");
    });

  };

  return (
    <>
      {/* REUSABLE NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <div style={{ padding: "110px 40px", background: "#f5f6f8", minHeight: "100vh" }}>

        <h3>Declare Winners</h3>

        <input
          className="form-control mb-2"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="1st Winner"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="2nd Winner"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="3rd Winner"
          value={third}
          onChange={(e) => setThird(e.target.value)}
        />

        <button className="btn btn-primary" onClick={saveWinners}>
          Save Winners
        </button>

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
                <li>Winners</li>
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

export default Winners;