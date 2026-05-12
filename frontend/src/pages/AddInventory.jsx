import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { createInventory } from "../api/inventoryService";

function AddInventory() {
  const [form, setForm] = useState({
    asset: "",
    quantity: 1,
    location: "",
  });

  const [assets, setAssets] = useState([]);

  // Fetch assets
  useEffect(() => {
    API.get("assets/").then((res) => {
      setAssets(res.data.results || res.data);
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
      await createInventory(form);
      alert("Inventory added ✅");

      setForm({
        asset: "",
        quantity: 1,
        location: "",
      });
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Inventory</h2>

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

          {/* Quantity */}
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100">
            Add Inventory
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddInventory;