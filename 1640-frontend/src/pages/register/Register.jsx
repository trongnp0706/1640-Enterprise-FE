import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        role_ticker: "",
        department_id: "",
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
                    <h1>1640 Web Enterprise</h1>
                    <p>
                        University Idea Management
                    </p>
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
                        <input
                            type="text"
                            placeholder="Role"
                            name="role_ticker"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Department"
                            name="department_id"
                            onChange={handleChange}
                        />
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
