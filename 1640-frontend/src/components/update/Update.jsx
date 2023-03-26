import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./update.scss";

const Update = ({ setOpenUpdate }) => {
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    user_name: "",
    role_ticker: "USR",
    department_id: "FDP",
    id: currentUser?.data?.user?.id,
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.patch("user/update", inputs);
      await queryClient.invalidateQueries(["user"]);
    } catch (err) {
      setErr(err.response.data);
      throw err;
    }
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <label>Email</label>
          <input
            type="text"
            value={inputs.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={inputs.password}
            name="password"
            onChange={handleChange}
          />
          <label>Username</label>
          <input
            type="text"
            value={inputs.user_name}
            name="user_name"
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
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
