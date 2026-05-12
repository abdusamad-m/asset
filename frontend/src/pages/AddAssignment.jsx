import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { createAssignment } from "../api/assignmentService";

function AddAssignment() {
  const [form, setForm] = useState({
    asset: "",
    assigned_to: "",
    status: "Assigned",
  });

  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data
  useEffect(() => {
    API.get("assets/").then((res) => {
      setAssets(res.data.results || res.data);
    });

    API.get("users/").then((res) => {
      setUsers(res.data.results || res.data);
    });
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
      await createAssignment(form);
      alert("Assignment created ✅");

      setForm({
        asset: "",
        assigned_to: "",
        status: "Assigned",
      });
    } catch (err) {
      console.log(err.response?.data);
      alert("Error ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Assign Asset</h2>

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
            <label className="form-label">Assign To</label>
            <select
              className="form-select"
              name="assigned_to"
              value={form.assigned_to}
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

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Assigned">Assigned</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-success w-100">
            Assign Asset
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAssignment;