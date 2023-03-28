import "./post.scss";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import {Button} from "@mui/material";

const Post = ({ post }) => {
    console.log(post)
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    // const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    //     makeRequest.get("/likes?postId=" + post.id).then((res) => {
    //         return res.data;
    //     })
    // );

    const queryClient = useQueryClient();

    // const mutation = useMutation(
    //     (liked) => {
    //         if (liked) return makeRequest.delete("/likes?postId=" + post.id);
    //         return makeRequest.post("/likes", { postId: post.id });
    //     },
    //     {
    //         onSuccess: () => {
    //             // Invalidate and refetch
    //             queryClient.invalidateQueries(["likes"]);
    //         },
    //     }
    // );
    const deleteMutation = useMutation(
        (postId) => {
            return makeRequest.delete("/posts/" + postId);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    // const handleLike = () => {
    //     mutation.mutate(data.includes(currentUser.id));
    // };

    const handleDelete = () => {
        deleteMutation.mutate(post.id);
    };

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={currentUser?.data?.user?.avatar} alt="avatar" />
                        <div className="details">
                            <Link
                                to={`/profile/${post?.user_id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <span className="name">{post?.title}</span>
                            </Link>
                            <span className="date">{moment(post?.created_at).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && post.userId === currentUser.id && (
                        <button onClick={handleDelete}>delete</button>
                    )}
                </div>
                <div className="content">
                    <p>{post?.content}</p>
                    <img src={currentUser?.data?.user?.avatar} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {/*{isLoading ? (*/}
                        {/*    "loading"*/}
                        {/*) : data.includes(currentUser.id) ? (*/}
                        {/*    <FavoriteOutlinedIcon*/}
                        {/*        style={{ color: "red" }}*/}
                        {/*        onClick={handleLike}*/}
                        {/*    />*/}
                        {/*) : (*/}
                        {/*    <FavoriteBorderOutlinedIcon onClick={handleLike} />*/}
                        {/*)}*/}
                        {/*{data?.length} Likes*/}
                        <ThumbUpIcon
                            style={{ color: "green" }}
                        />
                        <ThumbUpOutlinedIcon />
                        Upvote
                    </div>
                    <div className="item">
                        {/*{isLoading ? (*/}
                        {/*    "loading"*/}
                        {/*) : data.includes(currentUser.id) ? (*/}
                        {/*    <FavoriteOutlinedIcon*/}
                        {/*        style={{ color: "red" }}*/}
                        {/*        onClick={handleLike}*/}
                        {/*    />*/}
                        {/*) : (*/}
                        {/*    <FavoriteBorderOutlinedIcon onClick={handleLike} />*/}
                        {/*)}*/}
                        {/*{data?.length} Likes*/}
                        <ThumbDownIcon
                            style={{ color: "red" }}
                        />
                        <ThumbDownOutlinedIcon />
                        Downvote
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        Comments
                    </div>

                    <div className="download">
                        <Button>Download</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;