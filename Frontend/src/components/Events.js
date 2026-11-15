import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Events() {

  const [events, setEvents] = useState([]);

  // basic
  const [eventName, setEventName] = useState("");
  const [tagline, setTagline] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [fees, setFees] = useState("");
  const [maxGroups, setMaxGroups] = useState("");
  const [location, setLocation] = useState("");

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3000";

  // ================= READ =================
  const getData = () => {
    fetch(`${API}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= CREATE + UPDATE =================
  const handleSubmit = async () => {

    if (!eventName || !tagline || !description || !location) {
      alert("Fill all required fields");
      return;
    }

    const url = editId
      ? `${API}/events/${editId}`
      : `${API}/events`;

    const method = editId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  eventName,
  eventTagline: tagline,
  eventImage: "https://via.placeholder.com/150",
  eventDescription: description,

  groupMinParticipants: Number(min),
  groupMaxParticipants: Number(max),

  eventFees: Number(fees),
  maxGroupsAllowed: Number(maxGroups),

  eventLocation: location,

  departmentId: "507f1f77bcf86cd799439011",
  eventCoordinatorId: "507f1f77bcf86cd799439012"
})
      });

      alert(editId ? "Updated" : "Added");

      // reset
      setEditId(null);
      setEventName("");
      setTagline("");
      setImage("");
      setDescription("");
      setMin("");
      setMax("");
      setFees("");
      setMaxGroups("");
      setLocation("");

      getData();

    } catch (err) {
      console.log(err);
      alert("Error occurred");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    await fetch(`${API}/events/${id}`, {
      method: "DELETE"
    });

    getData();
  };

  // ================= EDIT =================
  const handleEdit = (e) => {
    setEditId(e._id);

    setEventName(e.eventName);
    setTagline(e.eventTagline);
    setImage(e.eventImage);
    setDescription(e.eventDescription);

    setMin(e.groupMinParticipants);
    setMax(e.groupMaxParticipants);

    setFees(e.eventFees);
    setMaxGroups(e.maxGroupsAllowed);

    setLocation(e.eventLocation);
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 pt-5">

        <h3>🎉 Event Management (SRS Based)</h3>

        {/* FORM */}
        <div className="card p-3 mb-4 shadow">

          <div className="row g-2">

            <div className="col-md-3">
              <input className="form-control" placeholder="Event Name"
                value={eventName} onChange={e => setEventName(e.target.value)} />
            </div>

            <div className="col-md-3">
              <input className="form-control" placeholder="Tagline"
                value={tagline} onChange={e => setTagline(e.target.value)} />
            </div>

            <div className="col-md-3">
              <input className="form-control" placeholder="Image URL"
                value={image} onChange={e => setImage(e.target.value)} />
            </div>

            <div className="col-md-3">
              <input className="form-control" placeholder="Location"
                value={location} onChange={e => setLocation(e.target.value)} />
            </div>

            <div className="col-md-6">
              <input className="form-control" placeholder="Description"
                value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="col-md-3">
              <input type="number" className="form-control" placeholder="Min Participants"
                value={min} onChange={e => setMin(e.target.value)} />
            </div>

            <div className="col-md-3">
              <input type="number" className="form-control" placeholder="Max Participants"
                value={max} onChange={e => setMax(e.target.value)} />
            </div>

            <div className="col-md-3">
              <input type="number" className="form-control" placeholder="Fees"
                value={fees} onChange={e => setFees(e.target.value)} />
            </div>

            <div className="col-md-3">
              <input type="number" className="form-control" placeholder="Max Groups"
                value={maxGroups} onChange={e => setMaxGroups(e.target.value)} />
            </div>

            <div className="col-md-3">
              <button className="btn btn-success w-100" onClick={handleSubmit}>
                {editId ? "Update" : "Add"}
              </button>
            </div>

          </div>

        </div>

        {/* TABLE */}
        <table className="table table-bordered bg-white">

          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Fees</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {events.map((e, i) => (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.eventName}</td>
                <td>₹{e.eventFees}</td>
                <td>{e.eventLocation}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(e)}>
                    Edit
                  </button>

                  <button className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(e._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Events;