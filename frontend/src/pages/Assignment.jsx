import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAssignments,
  deleteAssignment,
} from "../api/assignmentService";

function Assignment() {
  const [assignments, setAssignments] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getAssignments();
      setAssignments(res.data.results || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this assignment?")) {
      await deleteAssignment(id);
      fetchData();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Assignments</h2>
        <Link to="/add-assignment" className="btn btn-success">
          + Assign Asset
        </Link>
      </div>

      <div className="card shadow p-3">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Asset</th>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {assignments.length > 0 ? (
              assignments.map((a) => (
                <tr key={a.id}>
                  <td>{a.asset}</td>
                  <td>{a.assigned_to}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.status === "Assigned"
                          ? "bg-warning text-dark"
                          : "bg-success"
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
                <td colSpan="4" className="text-center">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assignment;