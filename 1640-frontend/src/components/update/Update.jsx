import {useContext, useState} from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

const Update = ({ setOpenUpdate}) => {
    const { currentUser } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        user_name: "",
        role_ticker: "",
        department_id: "",
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
            await queryClient.invalidateQueries(["user"])
        } catch (err) {
            setErr(err.response.data);
            throw err;
        }
            setOpenUpdate(false)
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
                    <label>Role</label>
                    <input
                        type="text"
                        name="role_ticker"
                        value={inputs.role_ticker}
                        onChange={handleChange}
                    />
                    <label>Department</label>
                    <input
                        type="text"
                        name="department_id"
                        value={inputs.department_id}
                        onChange={handleChange}
                    />
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
