import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import Products from "./Products";
import Customers from "./Customers";
import Orders from "./Orders";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          <Link className="navbar-brand" to="/">
            Inventory System
          </Link>

          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>

            <Link className="nav-link" to="/products">
              Products
            </Link>

            <Link className="nav-link" to="/customers">
              Customers
            </Link>

            <Link className="nav-link" to="/orders">
              Orders
            </Link>
          </div>

        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;