import "./home.scss"
import Posts from "../../components/posts/Posts"
import CreatePost from "../../components/createPost/CreatePost";
import { TermContext } from "../../context/termContext";
import React, {useContext} from "react";

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