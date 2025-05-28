import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { useSnackbar } from "notistack";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    enqueueSnackbar("Google Sign-In coming soon!", { variant: "info" });
  };

  function authenticate(e) {
    e.preventDefault();
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          localStorage.setItem("userToken", data.accessToken);
          setEmail("");
          setPassword("");
          enqueueSnackbar(data.message, { variant: "success" });
        } else {
          enqueueSnackbar(data.message, { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong.", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <section className="login-page" id="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={authenticate}>
          <h2 className="p-3">AeroLink</h2>
          <hr className="mb-3 mb-sm-5" />

          <span className="sign-in-span text-center d-block">
            Sign in with your AeroLink Account
          </span>

          <div className="google-sign d-flex justify-content-center gap-2 align-items-center mt-3 mb-3 p-1 p-sm-2">
            <img
              src="/images/icons/google-signin.png"
              alt="Google Sign-In"
              height="30px"
              width="30px"
              className="login-icons"
            />
            <Link
              to="#"
              className="sign-in-google"
              onClick={handleGoogleSignIn}
              style={{ cursor: "pointer" }}
            >
              Sign in with Google
            </Link>
          </div>

          <div className="or-divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <div className="login-input-group">
            <label htmlFor="email">Email Address</label>
            <div className="login-input d-flex justify-content-center align-items-center">
              <img
                src="/images/icons/emailIcon.png"
                alt="Email Icon"
                height="30px"
                className="login-icons"
              />
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter your email"
                style={{ border: "none" }}
              />
            </div>
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <div className="login-input d-flex justify-content-center align-items-center position-relative">
              <img
                src="/images/icons/lockIcon.png"
                alt="Password Icon"
                height="30px"
                className="login-icons"
              />
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Enter your password"
                style={{ border: "none" }}
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

          <div className="login-button d-flex justify-content-between align-items-center mb-5">
            <button type="submit" className="btn btn-login" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "LOGIN"
              )}
            </button>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          <hr />
          <p className="text-center sign-up-text">
            Don't have an account?
            <Link
              to="/register"
              style={{
                color: "var(--secondary-color)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
