import React, { useState } from "react";
import "./LoginModal.css";
import loginGif from "../../Assets/login.gif";
import signupGif from "../../Assets/man.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadCartFromServer } from "../../utils/cartHelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ closeModal }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/api/auth/${isSignup ? "signup" : "login"}`;
      const payload = isSignup ? { name, email, password } : { email, password };

      const response = await axios.post(url, payload);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        const userId = response.data.user._id;
        const cartFromDB = await loadCartFromServer(userId);
        localStorage.setItem("cart", JSON.stringify(cartFromDB));

        window.dispatchEvent(new Event("user-logged-in")); // Notify other components

        toast.success(`${isSignup ? "Signup" : "Login"} successful!`);
        closeModal();
        navigate("/");
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>&times;</span>
        <h2>
          <img
            src={isSignup ? signupGif : loginGif}
            alt={isSignup ? "Sign Up" : "Login"}
            className="auth-gif"
          />
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="switch-text"
          >
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

