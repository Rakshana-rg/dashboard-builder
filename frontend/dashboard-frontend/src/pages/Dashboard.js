import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center">
        <h2>Dashboard</h2>

        <div className="d-flex align-items-center">
          <select className="form-select d-inline w-auto me-2">
            <option>All time</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>

          <button 
            className="btn btn-dark"
            onClick={() => navigate("/configure")}
          >
            Configure Dashboard
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="text-center mt-5">
        <h5>No widgets configured</h5>
        <p>Click on Configure Dashboard to add widgets</p>
      </div>

    </div>
  );
}

export default Dashboard;