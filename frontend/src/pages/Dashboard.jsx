import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { Link } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState({
    assets: 0,
    tickets: 0,
    assignments: 0,
  });

  const fetchDashboard = async () => {
    try {
      const res = await API.get("dashboard/");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Dashboard</h2>

      {/* Stats Cards */}
      <div className="row g-4">
        {/* Assets */}
        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Assets</h5>
            <h2 className="text-primary">{data.assets}</h2>
          </div>
        </div>

        {/* Tickets */}
        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Tickets</h5>
            <h2 className="text-danger">{data.tickets}</h2>
          </div>
        </div>

        {/* Assignments */}
        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Assignments</h5>
            <h2 className="text-success">{data.assignments}</h2>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="card shadow mt-5 p-4">
        <h5 className="mb-3">Quick Actions</h5>

        <div className="d-flex flex-wrap gap-3">
          <Link to="/asset" className="btn btn-outline-primary">
            Assets
          </Link>

          <Link to="/inventory" className="btn btn-outline-secondary">
            Inventory
          </Link>

          <Link to="/assignments" className="btn btn-outline-success">
            Assignments
          </Link>

          <Link to="/tickets" className="btn btn-outline-danger">
            Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;