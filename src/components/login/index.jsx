import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmitLogin = event => {
    event.preventDefault();

    setErrorMsg("");

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      eachUser =>
        eachUser.email === email &&
        eachUser.password === password
    );

    if (validUser) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(validUser)
      );

      navigate("/");
    } else {
      setErrorMsg(
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-left">

          <h1>🌾 FarmConnect</h1>

          <p>
            Connecting Farmers & Buyers
            Across India.
          </p>

          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000"
            alt="farm"
            className="login-image"
          />

        </div>

        <div className="login-right">

          <h2>Welcome Back 👋</h2>

          <p className="subtitle">
            Login to continue your journey
          </p>

          <form
            onSubmit={onSubmitLogin}
            className="login-form"
          >

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e =>
                setEmail(e.target.value)
              }
              className="input-field"
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e =>
                setPassword(e.target.value)
              }
              className="input-field"
            />

            {errorMsg && (
              <p className="error-message">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>

            <p className="register-text">
              Don't have an account?

              <Link
                to="/register"
                className="register-link"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;