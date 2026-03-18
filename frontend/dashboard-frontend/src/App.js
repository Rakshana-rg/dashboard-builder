
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import ConfigureDashboard from "./pages/ConfigureDashboard";


function App() {

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/configure" element={<ConfigureDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;