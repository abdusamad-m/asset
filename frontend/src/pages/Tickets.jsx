import React, { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../api/ticketService";
import { Link } from "react-router-dom";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await getTickets();
      setTickets(res.data.results || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this ticket?")) {
      await deleteTicket(id);
      fetchTickets();
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tickets</h2>
        <Link to="/add-ticket" className="btn btn-danger">
          + Create Ticket
        </Link>
      </div>

      {/* Table */}
      <div className="card shadow p-3">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Asset</th>
              <th>User</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length > 0 ? (
              tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.asset}</td>
                  <td>{t.user}</td>
                  <td>{t.issue}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.status === "Open"
                          ? "bg-danger"
                          : t.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;