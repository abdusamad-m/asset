import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getInventory,
  deleteInventory,
} from "../api/inventoryService";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const res = await getInventory();
      setInventory(res.data.results || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this inventory item?")) {
      await deleteInventory(id);
      fetchInventory();
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory</h2>
        <Link to="/add-inventory" className="btn btn-primary">
          + Add Inventory
        </Link>
      </div>

      {/* Table */}
      <div className="card shadow p-3">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Asset</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.asset}</td>
                  <td>{item.quantity}</td>
                  <td>{item.location}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No inventory found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;