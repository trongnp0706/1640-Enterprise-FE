import "./home.scss"
import MostViewedPosts from "../../components/posts/MostViewedPosts"
import CreatePost from "../../components/createPost/CreatePost";
import { TermContext } from "../../context/termContext";
import React, {useContext} from "react";

const MostViewed = () => {
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
            <MostViewedPosts/>
        </div>
    )
}

export default MostViewed