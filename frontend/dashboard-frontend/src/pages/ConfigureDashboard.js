import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import axios from "axios";
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  PolarArea
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
} from "chart.js";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// REGISTER CHARTS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const ConfigureDashboard = () => {
  const [layout, setLayout] = useState([]);
  const [orders, setOrders] = useState([]);

  // LOAD SAVED CONFIG
  useEffect(() => {
    const saved = localStorage.getItem("dashboardConfiguration");
    if (saved) {
      setLayout(JSON.parse(saved));
    }
  }, []);

  // FETCH DATA FROM DJANGO
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/orders/")
      .then(res => {
        console.log("API DATA:", res.data);
        setOrders(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // SAVE CONFIG
  const saveConfiguration = () => {
    localStorage.setItem("dashboardConfiguration", JSON.stringify(layout));
    alert("Saved!");
  };

  // ADD WIDGET
  const addWidget = (type) => {
    const newWidget = {
      i: Date.now().toString(),
      x: 0,
      y: Infinity,
      w: 4,
      h: 4,
      type
    };
    setLayout(prev => [...prev, newWidget]);
  };

  // DELETE
  const removeWidget = (id) => {
    setLayout(layout.filter(item => item.i !== id));
  };

  // SAFE DATA (WORKS EVEN IF EMPTY)
  const labels = orders.length
    ? orders.map(o => o.first_name || "User")
    : ["Sample A", "Sample B", "Sample C"];

  const values = orders.length
    ? orders.map(o => Number(o.total_amount) || 1)
    : [100, 200, 150];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Orders Data",
        data: values,
        backgroundColor: [
          "powderblue",
          "Light gray",
          "Pale green",
          "Peach",
          "Dark gray"
        ]
      }
    ]
  };

  // RENDER WIDGETS
  const renderWidget = (type) => {
    switch (type) {
      case "Bar Chart":
        return <Bar data={chartData} />;

      case "Line Chart":
        return <Line data={chartData} />;

      case "Pie Chart":
        return <Pie data={chartData} />;

      case "Area Chart":
        return <Line data={chartData} />;

      case "Scatter Plot":
        return <Radar data={chartData} />;

      case "Doughnut Chart":
        return <Doughnut data={chartData} />;

      case "Polar Area":
        return <PolarArea data={chartData} />;

      case "Table":
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td>{o.first_name}</td>
                  <td>{o.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "KPI Card":
        return (
          <div style={{ textAlign: "center" }}>
            <h5>Total Revenue</h5>
            <h3>
              ₹{values.reduce((a, b) => a + b, 0)}
            </h3>
          </div>
        );

      default:
        return <p>{type}</p>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-3" style={{background:"#f5f5f5",padding:"15px"}}>
          <h5>Widgets</h5>

          <b>Charts</b>
          <p onClick={() => addWidget("Bar Chart")}>Bar Chart</p>
          <p onClick={() => addWidget("Line Chart")}>Line Chart</p>
          <p onClick={() => addWidget("Pie Chart")}>Pie Chart</p>
          <p onClick={() => addWidget("Area Chart")}>Area Chart</p>
          <p onClick={() => addWidget("Scatter Plot")}>Scatter Plot</p>
          <p onClick={() => addWidget("Doughnut Chart")}>Doughnut Chart</p>
          <p onClick={() => addWidget("Polar Area")}>Polar Area</p>

          <b>Tables</b>
          <p onClick={() => addWidget("Table")}>Table</p>

          <b>KPI</b>
          <p onClick={() => addWidget("KPI Card")}>KPI Card</p>

          <button onClick={saveConfiguration} className="btn btn-dark w-100 mt-3">
            Save Configuration
          </button>
        </div>

        {/* CANVAS */}
        <div className="col-md-9">
          <h4>Dashboard</h4>
          <p>Total Records: {orders.length}</p>

          <GridLayout layout={layout} cols={12} rowHeight={30} width={1000}>
            {layout.map(widget => (
              <div key={widget.i} style={{background:"#fff",padding:"10px"}}>
                <button onClick={() => removeWidget(widget.i)}>X</button>
                {renderWidget(widget.type)}
              </div>
            ))}
          </GridLayout>
        </div>

      </div>
    </div>
  );
};

export default ConfigureDashboard;