import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAssets, deleteAsset } from "../api/assetService";

function Assets() {
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    const res = await getAssets();
    setAssets(res.data.results || res.data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      await deleteAsset(id);
      fetchAssets();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Assets</h2>
        <Link to="/add-asset" className="btn btn-primary">
          + Add Asset
        </Link>
      </div>

      <div className="card shadow p-3">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.length > 0 ? (
              assets.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.category}</td>
                  <td>{a.serial_number}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.status === "Available"
                          ? "bg-success"
                          : a.status === "Assigned"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assets;