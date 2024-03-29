import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import {PageContext} from "../../context/pageContext";
import {useContext} from "react";

const PopularPosts = ({ }) => {
    const { currentPage } = useContext(PageContext);
    const { isLoading, error, data } = useQuery(["posts", currentPage], () =>
        makeRequest.get(`idea/popular?limit=5&page=${currentPage}`).then((res) => {
            console.log(res?.data?.data)
            return res?.data?.data;
        })
    );

    return (
        <div className="posts">
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "loading"
                    : data && data
                        ? data.map((post) => <Post post={post} key={post.id} />) : "No post yet. Why don't you try to post something?"}
        </div>
    );
};

export default PopularPosts;
