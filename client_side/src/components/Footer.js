import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* Brand Info */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h5 className="fw-bold text-uppercase">AeroLink</h5>
            <p>
              Your trusted partner for booking flights and exploring
              destinations with ease and comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-light">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-decoration-none text-light">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-decoration-none text-light"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Technologies</h6>
            <ul className="list-unstyled">
              <li>React</li>
              <li>Node.js</li>
              <li>Express</li>
              <li>MongoDB</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <button
                type="button"
                className="text-light fs-5 btn btn-link p-0"
                aria-label="Facebook"
                onClick={() => window.open("https://facebook.com", "_blank")}
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button
                type="button"
                className="text-light fs-5 btn btn-link p-0"
                aria-label="Instagram"
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <i className="fab fa-instagram"></i>
              </button>
              <button
                type="button"
                className="text-light fs-5 btn btn-link p-0"
                aria-label="Twitter"
                onClick={() => window.open("https://twitter.com", "_blank")}
              >
                <i className="fab fa-twitter"></i>
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4 text-secondary" />

        <div className="text-center">
          &copy; 2025 <strong>AeroLink</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
