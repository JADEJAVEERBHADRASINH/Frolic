import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {

      if (data.token) {

        // SAVE TOKEN & ROLE
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // ROLE BASED REDIRECT
        if (data.role === "admin") {
          navigate("/");
        } else {
          navigate("/user"); // optional user page
        }

      } else {
        alert("Invalid Email or Password");
      }

    })
    .catch(err => {
      console.log(err);
      alert("Server Error");
    });

  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #3b5bdb, #e03131)",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>

      <div style={{
        width: "380px",
        background: "white",
        padding: "30px",
        borderRadius: "14px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
        textAlign: "center"
      }}>

        {/* LOGO */}
        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3b5bdb, #e03131)",
          color: "white",
          fontSize: "26px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 15px"
        }}>
          F
        </div>

        <h3 className="text-primary mb-4">Login</h3>

        {/* EMAIL */}
        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="text-muted mt-3" style={{ fontSize: "13px" }}>
          © Frolic Event Management
        </p>

      </div>

    </div>
  );
}

export default Login;