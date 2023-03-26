import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient} from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

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
                            <div className="center">
                                <span>{data?.data?.username}</span>
                                <div className="info">
                                    <div className="item">
                                        <PlaceIcon />
                                        <span>{data?.data?.role_ticker}</span>
                                    </div>
                                    <div className="item">
                                        <LanguageIcon />
                                        <span>{data?.data?.email}</span>
                                    </div>
                                </div>
                                {isLoading ? (
                                    "loading"
                                ) : userId === currentUser?.data?.user?.id ? (
                                    <button onClick={() => setOpenUpdate(true)}>Update</button>
                                ) : (
                                    <button>Follow</button>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </div>
    );
};

export default Profile;
