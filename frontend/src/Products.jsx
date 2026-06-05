import { useEffect, useState } from "react";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  const fetchProducts = () => {
    axios
      .get("http://127.0.0.1:8000/products")
      .then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
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
        "http://127.0.0.1:8000/products",
        {
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        }
      );

      alert("Product Added");

      setFormData({
        name: "",
        sku: "",
        price: "",
        quantity: ""
      });

      fetchProducts();

    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };
const deleteProduct = async (id) => {
  try {
    await axios.delete(
      `http://127.0.0.1:8000/products/${id}`
    );

    fetchProducts();

  } catch (err) {
    alert("Delete failed");
  }
};

  return (
    <div>

      <h2 className="mb-4">Products</h2>

      <div className="card p-3 mb-4">

        <h4>Add Product</h4>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-2"
            placeholder="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            placeholder="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            placeholder="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <button
            className="btn btn-primary"
            type="submit"
          >
            Add Product
          </button>

        </form>

      </div>

      <table className="table table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>

<td>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteProduct(p.id)}
  >
    Delete
  </button>
</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Products;