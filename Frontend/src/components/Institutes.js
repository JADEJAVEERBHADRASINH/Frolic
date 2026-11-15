import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function Institutes() {

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);

  // read
  const getData = () => {
    fetch("http://localhost:3000/department")
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  };

  
  useEffect(() => {
    getData();
  }, []);

  // createupdate//

  const handleSubmit = async () => {

    if (!name.trim()) {
      alert("Enter Institute Name");
      return;
    }

    const url = editId
      ? `http://localhost:3000/department/${editId}`
      : "http://localhost:3000/department";

    const method = editId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departmentName: name,
          departmentDescription: desc
        })
      });

      alert(editId ? "Updated Successfully" : "Added Successfully");

      // reset
      setEditId(null);
      setName("");
      setDesc("");

      getData();

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // delete
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await fetch(`http://localhost:3000/department/${id}`, {
        method: "DELETE"
      });

      alert("Deleted Successfully");
      getData();

    } catch (err) {
      console.log(err);
    }
  };

  // edit
  const handleEdit = (dept) => {
    setEditId(dept._id);
    setName(dept.departmentName);
    setDesc(dept.departmentDescription);
  };

  return (
    <>
      <Layout>

        <div className="container-fluid" style={{ marginTop: "90px" }}>

          <h3 className="mb-4">🏫 Institutes Management</h3>

          {/* from */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              {editId ? "Update Institute" : "Add New Institute"}
            </div>

            <div className="card-body">
              <div className="row">

                <div className="col-md-5">
                  <label className="form-label">Institute Name</label>
                  <input
                    className="form-control"
                    placeholder="Enter institute name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-md-5">
                  <label className="form-label">Description</label>
                  <input
                    className="form-control"
                    placeholder="Enter description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>

                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-success w-100"
                    onClick={handleSubmit}
                  >
                    {editId ? "Update" : "Add"}
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* table */}
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              Institute List
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">

                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th width="180">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          No Data Found
                        </td>
                      </tr>
                    ) : (
                      data.map((dept, index) => (
                        <tr key={dept._id}>
                          <td>{index + 1}</td>
                          <td>{dept.departmentName}</td>
                          <td>{dept.departmentDescription}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(dept)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(dept._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>

                </table>
              </div>
            </div>
          </div>

        </div>

      </Layout>

      {/* footer */}
      <Footer />
    </>
  );
}

export default Institutes;