import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { createTicket } from "../api/ticketService";

function AddTicket() {
  const [form, setForm] = useState({
    asset: "",
    user: "",
    issue: "",
    status: "Open",
  });

  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    API.get("assets/").then((res) =>
      setAssets(res.data.results || res.data)
    );

    API.get("users/").then((res) =>
      setUsers(res.data.results || res.data)
    );
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTicket(form);
      alert("Ticket created ✅");

      setForm({
        asset: "",
        user: "",
        issue: "",
        status: "Open",
      });
    } catch (err) {
      console.log(err.response?.data);
      alert("Error ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Create Ticket</h2>

        <form onSubmit={handleSubmit}>
          {/* Asset */}
          <div className="mb-3">
            <label className="form-label">Select Asset</label>
            <select
              className="form-select"
              name="asset"
              value={form.asset}
              onChange={handleChange}
              required
            >
              <option value="">Choose asset</option>
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* User */}
          <div className="mb-3">
            <label className="form-label">Select User</label>
            <select
              className="form-select"
              name="user"
              value={form.user}
              onChange={handleChange}
              required
            >
              <option value="">Choose user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>

          {/* Issue */}
          <div className="mb-3">
            <label className="form-label">Issue</label>
            <textarea
              className="form-control"
              name="issue"
              value={form.issue}
              onChange={handleChange}
              placeholder="Describe the issue"
              rows="4"
              required
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-danger w-100">
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTicket;