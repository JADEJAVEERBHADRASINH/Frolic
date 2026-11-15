import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Users() {

  const [users, setUsers] = useState([]);

  // FETCH USERS
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <>
      {/* REUSABLE NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <div style={{ padding: "110px 40px", background: "#f5f6f8", minHeight: "100vh" }}>

        <h3>Users</h3>

        <table className="table table-bordered bg-white">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={
                      user.role === "admin"
                        ? "badge bg-danger"
                        : "badge bg-secondary"
                    }
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

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

export default Users;