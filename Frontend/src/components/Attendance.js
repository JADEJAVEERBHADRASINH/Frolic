import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Attendance() {

  const [groups, setGroups] = useState([]);

  // FETCH GROUPS
  useEffect(() => {
    fetch("http://localhost:3000/groups")
      .then(res => res.json())
      .then(data => setGroups(data));
  }, []);

  // TOGGLE CHECKBOX
  const toggleAttendance = (id) => {
    const updated = groups.map(group =>
      group._id === id
        ? { ...group, isPresent: !group.isPresent }
        : group
    );
    setGroups(updated);
  };

  // SAVE ATTENDANCE
  const saveAttendance = () => {

    groups.forEach(group => {
      fetch(`http://localhost:3000/groups/${group._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isPresent: group.isPresent })
      });
    });

    alert("Attendance Saved");
  };

  return (
    <>
      {/* REUSABLE NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <div style={{ padding: "110px 40px", background: "#f5f6f8", minHeight: "100vh" }}>

        <h3>Attendance</h3>

        <table className="table table-bordered bg-white">

          <thead>
            <tr>
              <th>Group Name</th>
              <th className="text-center">Present</th>
            </tr>
          </thead>

          <tbody>

            {groups.map(group => (
              <tr key={group._id}>
                <td>{group.groupName}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={group.isPresent || false}
                    onChange={() => toggleAttendance(group._id)}
                  />
                </td>
              </tr>
            ))}

          </tbody>

        </table>

        <button className="btn btn-primary" onClick={saveAttendance}>
          Save Attendance
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
                <li>Attendance</li>
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

export default Attendance;