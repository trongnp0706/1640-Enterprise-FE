import "./home.scss"
import Posts from "../../components/posts/Posts"
import CreatePost from "../../components/createPost/CreatePost";
import { TermContext } from "../../context/termContext";
import React, {useContext} from "react";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";

const Home = () => {
    const { termConfirm } = useContext(TermContext);
    return (
        <div className="home">
                {termConfirm ? (
                        <>
                            <CreatePost/>
                        </>
                    ) : (
                        <>
                        </>
                    )}
            <Posts/>
        </div>
    )
}

export default Home