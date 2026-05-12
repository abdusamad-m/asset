import React, { useState } from "react";
import { createAsset } from "../api/assetService";
import { useNavigate } from "react-router-dom";

function AddAsset() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Laptop",
    serial_number: "",
    purchase_date: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAsset(formData);
      alert("Asset added ✅");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      alert("Bad request ❌ Check console");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Asset</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Asset Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter asset name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Laptop">Laptop</option>
              <option value="Mobile">Mobile</option>
              <option value="Monitor">Monitor</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Serial Number */}
          <div className="mb-3">
            <label className="form-label">Serial Number</label>
            <input
              type="text"
              className="form-control"
              name="serial_number"
              placeholder="Enter serial number"
              value={formData.serial_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* Purchase Date */}
          <div className="mb-3">
            <label className="form-label">Purchase Date</label>
            <input
              type="date"
              className="form-control"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100">
            Add Asset
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAsset;