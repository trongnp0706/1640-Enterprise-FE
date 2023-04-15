  import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

  const Update = ({ setOpenUpdate, userData }) => {
  const {currentUser} = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [inputs, setInputs] = useState({
    email: userData?.data?.email,
    password: "",
    user_name: userData?.data?.username,
    role_ticker: userData?.data?.role_ticker,
    department_id: userData?.data?.department_id,
    id: userData?.data?.id,
  });
  const [err, setErr] = useState(null);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation(
      async (user) => {
        const result = await makeRequest.patch("user/update", user)
        console.log(result)
        window.localStorage.setItem('user', JSON.stringify(result.data))
        return result;
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["user"]);

        },
      }
  );

    const adminmMutation = useMutation(
        async (user) => {
          const result = await makeRequest.patch("user/manage", user)
          console.log(result)
          window.localStorage.setItem('user', JSON.stringify(result.data))
          return result;
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["user"]);

          },
        }
    );

  const handleClick = async (e) => {
    e.preventDefault();
    let profileUrl;
    let avatarUrl;
    profileUrl = profile ? await upload(profile) : userData?.data?.avatar;
    avatarUrl = profileUrl?.data;

    try {
      mutation.mutate({...inputs, avatar: avatarUrl})
    } catch (err) {
      setErr(err.response.data);
      console.log(err)
    }

    setOpenUpdate(false);
    setProfile(null);
  };

    const handleClickAdmin = async (e) => {
      e.preventDefault();
      let profileUrl;
      let userPassword;
      profileUrl = userData?.data?.avatar;
      userPassword = userData?.data?.password;
      try {
        adminmMutation.mutate({...inputs, avatar: profileUrl, password: userPassword})
      } catch (err) {
        setErr(err.response.data);
        console.log(err)
      }

      setOpenUpdate(false);
      setProfile(null);
    };

  return (
    <div className="update">
      <div className="wrapper">
        <form>
        {currentUser.data.user.role_ticker === "SAD" && currentUser.data.user.id === userData.data.id ? (
          <>
          <h1>Update Your Profile</h1>

          <div className="files">
          <label htmlFor="profile">
          <span>Profile Picture</span>
          <div className="imgContainer">
          <img
          src={
          profile
          ? URL.createObjectURL(profile)
          : userData?.data?.avatar
        }
          alt=""
          />
          <CloudUploadIcon className="icon" />
          </div>
          </label>
          <input
          type="file"
          id="profile"
          style={{ display: "none" }}
          onChange={(e) => setProfile(e.target.files[0])}
          />
          </div>
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

          <label htmlFor="role">Role</label>
          <select
          id="role"
          name="role_ticker"
          value={inputs.role_ticker}
          onChange={handleChange}
          >
          <option value="USR">User</option>
          <option value="SAD">System Admin</option>
          <option value="QAM">QA Manager</option>
          </select>

          <label htmlFor="department">Department</label>

          <select
          id="department"
          name="department_id"
          value={inputs.department_id}
          onChange={handleChange}
          >
          <option value="FDP">FDP</option>
          <option value="SDP">SDP</option>
          <option value="TDP">TDP</option>
          </select>

        {err && <div>{err.message}</div>}
          <button onClick={handleClick}>Update</button>
          </>
          ) : currentUser.data.user.id === userData.data.id ? (
            <>
              <h1>Update Your Profile</h1>

              <div className="files">
                <label htmlFor="profile">
                  <span>Profile Picture</span>
                  <div className="imgContainer">
                    <img
                        src={
                          profile
                              ? URL.createObjectURL(profile)
                              : userData?.data?.avatar
                        }
                        alt=""
                    />
                    <CloudUploadIcon className="icon" />
                  </div>
                </label>
                <input
                    type="file"
                    id="profile"
                    style={{ display: "none" }}
                    onChange={(e) => setProfile(e.target.files[0])}
                />
              </div>
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

              {err && <div>{err.message}</div>}
              <button onClick={handleClick}>Update</button>
            </>
        ) : currentUser.data.user.role_ticker === "SAD" ? (
            <>
              <h1>Manage Staff</h1>
              <label htmlFor="role">Role</label>
              <select
                  id="role"
                  name="role_ticker"
                  value={inputs.role_ticker}
                  onChange={handleChange}
              >
                <option value="USR">User</option>
                <option value="SAD">System Admin</option>
                <option value="QAM">QA Manager</option>
              </select>

              <label htmlFor="department">Department</label>

              <select
                  id="department"
                  name="department_id"
                  value={inputs.department_id}
                  onChange={handleChange}
              >
                <option value="FDP">FDP</option>
                <option value="SDP">SDP</option>
                <option value="TDP">TDP</option>
              </select>

              {err && <div>{err.message}</div>}
              <button onClick={handleClickAdmin}>Update</button>
            </>
        ) : (
            <>
            </>
        )}
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
