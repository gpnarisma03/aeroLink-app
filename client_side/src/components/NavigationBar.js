import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg px-3 py-2 custom-navbar">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <h1 className="m-0">AeroLink</h1>
        </Link>
        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <i className="fas fa-bars text-white fs-3" />
        </button>
        {/* Collapsible Content */}
        <div
          className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <Link className="nav-link active" to="/" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <i className="fas fa-user me-2" />
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link register-link" to="/register">
                <i className="fas fa-user-plus me-1" /> Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
