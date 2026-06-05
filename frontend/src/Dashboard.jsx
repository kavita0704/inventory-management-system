import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products")
      .then(res => setProducts(res.data.length));

    axios.get("http://127.0.0.1:8000/customers")
      .then(res => setCustomers(res.data.length));

    axios.get("http://127.0.0.1:8000/orders")
      .then(res => setOrders(res.data.length));
  }, []);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h3>{products}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h3>{customers}</h3>
            <p>Total Customers</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h3>{orders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;