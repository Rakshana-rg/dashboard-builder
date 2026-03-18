import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    product: "",
    quantity: "",
    unit_price: "",
    total_amount: "",
    status: "",
    created_by: ""
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/orders/");
    setOrders(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/orders/", formData);
      setShowModal(false);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center">
        <h2>Customer Orders</h2>

        <button className="btn btn-dark" onClick={() => setShowModal(true)}>
          Create Order
        </button>
      </div>

      {/* Table */}
      {orders.length === 0 ? (
        <div className="text-center mt-5">
          <h5>No orders yet</h5>
        </div>
      ) : (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.first_name} {o.last_name}</td>
                <td>{o.product}</td>
                <td>{o.total_amount}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">

              <h4>Create Order</h4>

              <div className="row">
                <div className="col-md-6">
                  <input name="first_name" placeholder="First Name" className="form-control mb-2" onChange={handleChange} />
                  <input name="last_name" placeholder="Last Name" className="form-control mb-2" onChange={handleChange} />
                  <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
                  <input name="phone" placeholder="Phone" className="form-control mb-2" onChange={handleChange} />
                </div>

                <div className="col-md-6">
                  <input name="product" placeholder="Product" className="form-control mb-2" onChange={handleChange} />
                  <input name="quantity" placeholder="Quantity" className="form-control mb-2" onChange={handleChange} />
                  <input name="unit_price" placeholder="Unit Price" className="form-control mb-2" onChange={handleChange} />
                  <input name="total_amount" placeholder="Total Amount" className="form-control mb-2" onChange={handleChange} />
                </div>
              </div>

              <input name="status" placeholder="Status" className="form-control mb-2" onChange={handleChange} />
              <input name="created_by" placeholder="Created By" className="form-control mb-2" onChange={handleChange} />

              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-dark" onClick={handleSubmit}>
                  Submit
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Orders;