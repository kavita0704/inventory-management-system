import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const fetchCustomers = () => {
    axios
      .get("http://127.0.0.1:8000/customers")
      .then((res) => setCustomers(res.data));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/customers",
        formData
      );

      alert("Customer Added");

      setFormData({
        name: "",
        email: "",
        phone: ""
      });

      fetchCustomers();

    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div>

      <h2 className="mb-4">Customers</h2>

      <div className="card p-3 mb-4">

        <h4>Add Customer</h4>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-2"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <button
            className="btn btn-success"
            type="submit"
          >
            Add Customer
          </button>

        </form>

      </div>

      <table className="table table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>

          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Customers;