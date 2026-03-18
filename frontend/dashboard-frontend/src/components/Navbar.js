import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-4 d-flex justify-content-between">
      
      {/* Left Side */}
      <div className="d-flex align-items-center">
        <h5 className="me-4 mb-0">Dashboard Builder</h5>

        <Link to="/" className="nav-link me-3">
          Dashboard
        </Link>

        <Link to="/orders" className="nav-link">
          Orders
        </Link>
      </div>

      {/* Right Side */}
      <button className="btn btn-dark">
        Configure
      </button>

    </nav>
  );
}

export default Navbar;