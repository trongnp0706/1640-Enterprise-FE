import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role_ticker: "USR",
    department_id: "FDP",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:1313/user/add", inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <p>University Idea Management</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <label for="role">Role</label>
            <select
              id="role"
              name="role_ticker"
              value={inputs.role_ticker}
              onChange={handleChange}
            >
              <option value="USR">USR</option>
              <option value="SAD">SAD</option>
              <option value="SAM">SAM</option>
            </select>

            <label for="department">Department</label>

            <select
              id="department"
              name="department_id"
              value={inputs.department_id}
              onChange={handleChange}
            >
              <option value="FDP">FPD</option>
              <option value="SDP">SPD</option>
              <option value="TDP">TPD</option>
            </select>
            {err && <div>{err.message}</div>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
