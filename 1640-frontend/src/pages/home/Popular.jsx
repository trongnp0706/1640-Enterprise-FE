import "./home.scss"
import PopularPosts from "../../components/posts/PopularPosts"
import CreatePost from "../../components/createPost/CreatePost";
import { TermContext } from "../../context/termContext";
import React, {useContext} from "react";

const Popular = () => {
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
            <PopularPosts/>
        </div>
    )
}

export default Popular