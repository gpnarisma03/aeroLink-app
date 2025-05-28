import React, { useState, useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Link } from "react-router-dom";
import "../styles/Registration.css";

function Registration() {
  const DoB = useRef(null);

  useEffect(() => {
    flatpickr(DoB.current, {
      dateFormat: "m/d/Y",
      allowInput: true,
    });
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <section className="registration-page" id="registration-page">
      <div className="registration-container">
        <form className="registration-form" noValidate>
          <h2 className="p-3">AeroLink</h2>
          <hr />
          <span className="sign-in-span text-center d-block mb-4">Sign up</span>

          <div className="register-input-group mb-3">
            <label htmlFor="firstname">First Name</label>
            <div className="register-input d-flex justify-content-center align-items-center">
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Enter your firstname"
                required
              />
            </div>
          </div>

          <div className="register-input-group mb-3">
            <label htmlFor="lastname">Last Name</label>
            <div className="register-input d-flex justify-content-center align-items-center">
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Enter your lastname"
                required
              />
            </div>
          </div>

          <div className="register-input-group mb-3">
            <label htmlFor="email">Email Address</label>
            <div className="register-input d-flex justify-content-center align-items-center">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="register-input-group mb-3">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="input-group">
              <span className="input-group-text">+63</span>{" "}
              {/* Country code prefix */}
              <input
                type="tel"
                className="form-control"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />
            </div>
          </div>
          <div className="register-input-group mb-3">
            <label htmlFor="dob">Date of Birth</label>
            <div className="input-group position-relative p-1">
              <span
                className="register-date-icon"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  border: "none",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  margin: 0,
                  zIndex: 10,
                }}
              >
                <img
                  src="/images/icons/calendar.png"
                  alt="Calendar"
                  style={{ width: 20, height: 20 }}
                />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Birthdate"
                id="dob"
                ref={DoB}
                style={{ paddingLeft: "40px" }} // enough space for the icon
              />
            </div>
          </div>

          <div className="register-input-group mb-3 position-relative">
            <label htmlFor="password">Password</label>
            <div className="register-input d-flex justify-content-center align-items-center">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-sm position-absolute"
                style={{ right: "10px" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`password-toggle-icon bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <div className="register-input-group mb-3 position-relative">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="register-input d-flex justify-content-center align-items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="btn btn-sm position-absolute"
                style={{ right: "10px" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i
                  className={`password-toggle-icon bi ${
                    showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <div className="password-requirement mb-3">
            <span>Password requirements:</span>
            <ul>
              <li>At least 8 characters</li>
              <li>A capital letter</li>
              <li>A lowercase letter</li>
              <li>A number</li>
              <li>A symbol</li>
            </ul>
          </div>

          <div className="terms-and-conditions d-flex align-items-start gap-2 mt-3 mb-4">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              required
              style={{ marginTop: 6 }}
            />
            <label htmlFor="agree" className="mb-0">
              I confirm that I have read, understood, and agree to the{" "}
              <span>Terms and Conditions</span> and the updated AeroLink{" "}
              <span>Privacy Policy</span>. I consent to the collection, use,
              processing and sharing of my personal information in accordance
              therewith.
            </label>
          </div>

          <div className="register-button d-flex justify-content-center align-items-center mt-3 mb-3">
            <button type="submit" className="btn btn-register">
              Register
            </button>
          </div>

          <hr />

          <p className="text-center sign-up-text">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--secondary-color)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Registration;
