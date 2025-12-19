import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState();
  const [Loading, setLoading] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const apicall = () => {
    axios.post("/Login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          navigate("/Table");
          localStorage.setItem("emailget", email);
          localStorage.setItem("passwordget", password);
          console.log(res);
        } else {
          setError("Invalid Username or Password!");
        }
      })
      .catch((err) => {
        setLoading(false);
        // setError("Invalid Username or Password!");
         Swal.fire(
          'Error!',
          `${err.response.data.message}`,
          'error'
        )
      });
  };
  function loginbutton(e) {
    e.preventDefault();
    setLoading(true);
    apicall();
  }
  return (
    <>
      <div className="main_div">
        <div className="background-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
        <div className="from_data">
          <div className="login-container">
            <div className="welcome-section">
              <div className="welcome-icon">
                <LockOutlined />
              </div>
              <h1 className="welcome-title">Welcome Back</h1>
              <p className="welcome-subtitle">Sign in to continue to your account</p>
            </div>
            
            <form className="login-form" onSubmit={loginbutton}>
              {/* Email section */}
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <MailOutlined />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password section */}
              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <LockOutlined />
                  </span>
                  <input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle"
                    onClick={togglePassword}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        togglePassword();
                      }
                    }}
                  >
                    {passwordShown ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </span>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {/* Forget password */}
              <div className="forgot-password-wrapper">
                <span
                  className="forgot-password"
                  onClick={() => {
                    navigate("/Forgetpassword");
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate("/Forgetpassword");
                    }
                  }}
                >
                  Forgot password?
                </span>
              </div>

              {/* Button section */}
              <button
                className={`loginbtn ${Loading ? 'loading' : ''}`}
                type="submit"
                disabled={Loading}
              >
                {Loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
