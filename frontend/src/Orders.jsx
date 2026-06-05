import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: ""
  });

  const fetchOrders = () => {
    axios
      .get("http://127.0.0.1:8000/orders")
      .then((res) => setOrders(res.data));
  };

  useEffect(() => {

    fetchOrders();

    axios
      .get("http://127.0.0.1:8000/customers")
      .then((res) => setCustomers(res.data));

    axios
      .get("http://127.0.0.1:8000/products")
      .then((res) => setProducts(res.data));

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/orders",
        {
          customer_id: Number(formData.customer_id),
          product_id: Number(formData.product_id),
          quantity: Number(formData.quantity)
        }
      );

      alert("Order Created");

      fetchOrders();

    } catch (err) {

      alert(err.response?.data?.detail || "Error");

    }
  };

  return (
    <div>

      <h2 className="mb-4">Orders</h2>

      <div className="card p-3 mb-4">

        <h4>Create Order</h4>

        <form onSubmit={handleSubmit}>

          <select
            className="form-control mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                customer_id: e.target.value
              })
            }
          >
            <option>Select Customer</option>

            {customers.map((c) => (
              <option
                key={c.id}
                value={c.id}
              >
                {c.name}
              </option>
            ))}

          </select>

          <select
            className="form-control mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                product_id: e.target.value
              })
            }
          >
            <option>Select Product</option>

            {products.map((p) => (
              <option
                key={p.id}
                value={p.id}
              >
                {p.name}
              </option>
            ))}

          </select>

          <input
            className="form-control mb-2"
            placeholder="Quantity"
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: e.target.value
              })
            }
          />

          <button
            className="btn btn-primary"
            type="submit"
          >
            Create Order
          </button>

        </form>

      </div>

      <table className="table table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer_id}</td>
              <td>{o.product_id}</td>
              <td>{o.quantity}</td>
              <td>₹{o.total_amount}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Orders;