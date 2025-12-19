import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useToast } from "../../../Contexts/ToastContext";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState(localStorage.getItem("passwordget") || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setemail] = useState(localStorage.getItem("emailget") || "");
  const [loading, setLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Track whether passwords match
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const { showToast } = useToast();

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(newPassword === e.target.value); // Check if passwords match dynamically
  };

   const togglePassword = () => {
     setPasswordShown(!passwordShown);
   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/changePassword", {
        email: email,
        password: newPassword,
      });

     showToast("Password changed successfully", { type: "success" });
       navigate("/");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
     showToast( error.response?.data?.message || "Failed to change password", { type: "error" });
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="from_data rounded">
      <h6 className="fw-bolder fs-3 mb-4 text-center mt-3">Change Password</h6>
      <form onSubmit={handleSubmit} className="modal-content w-100 ">
        <div className="text-start mb-5">
          <div>
            <div className="emailsection position-relative d-grid my-2">
              <label
                htmlFor="email"
                className="lablesection colorblack text-start mb-1 mt-4 mt-md-4 mt-sm-3 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                className="form-control inputsection py-2 mt-2"
                placeholder=""
                required
              ></input>
            </div>
          </div>
          <div className="position-relative">
            <label className="lablesection colorblack text-start mb-1 mt-4 mt-md-4 mt-sm-3 ">
              Old Password
            </label>
            <input
              type={passwordShown ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="form-control inputsection py-2 mt-2"
              required
            />
            <span
              className="position-absolute text-end showpassiconchage mt-5 "
              onClick={togglePassword}
            >
              {passwordShown ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          <div>
            <label className="lablesection colorblack text-start mb-1  mt-4 mt-md-4 mt-sm-3">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control inputsection py-2 mt-2"
              required
            />
          </div>
          <div>
            <label className="lablesection colorblack text-start mb-1  mt-4 mt-md-4 mt-sm-3">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`form-control inputsection py-2 mt-2 ${
                passwordsMatch ? "" : "passwords-not-matching"
              }`}
              required
            />
            {!passwordsMatch && (
              <span className="text-danger">Passwords do not match</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="border-0 px-3 mx-2  savebtn py-2 "
        >
          {loading ? "Loading..." : "SAVE CHANGE"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePasswordForm;
