import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Update from "../../components/update/Update";
import { AuthContext } from "../../context/authContext";
import "./profile.scss";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = useLocation().pathname.split("/")[2];
  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("user/" + userId).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="profileContainer">
            <div className="uInfo">
              <img
                className="avatar"
                src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                alt="My Avatar"
              />
              <h1 className="name">{data?.data?.username}</h1>
              <hr />
              <ul>
                <li className="email">
                  <strong>Email</strong>: {data?.data?.email}
                </li>
                <li className="role">
                  <strong>Role</strong>: {data?.data?.role_ticker}
                </li>
                <li className="department">
                  <strong>Department</strong>: {data?.data?.department_id}
                </li>
              </ul>
              {isLoading ? (
                "loading"
              ) : userId === currentUser?.data?.user?.id ? (
                <button className="btn" onClick={() => setOpenUpdate(true)}>
                  Update
                </button>
              ) : (
                <button className="btn">Follow</button>
              )}
            </div>
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
