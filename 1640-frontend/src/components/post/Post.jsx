import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Button } from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(["vote", post.id], () =>
      makeRequest
          .post("vote/get", {
            user_id: currentUser.data.user.id,
            idea_id: post.id,
          })
          .then((res) => res.data)
  );

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
    (postData) => {
      return makeRequest.delete("idea/delete", { postData });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const voteMutation = useMutation(
      (voteData) => {
        return makeRequest.post("vote/handle", voteData);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["vote", post.id]);
        },
      }
  );

  // const handleLike = () => {
  //     mutation.mutate(data.includes(currentUser.id));
  // };

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: post?.id });
  };

  const handleVote = (vote) => {
    voteMutation.mutate({user_id: currentUser?.data?.user?.id, idea_id: post?.id, vote: vote});
  };

  const showDeleteButton = post.userId === currentUser.id;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {post?.is_anonymous ? (
                <>
                  <img src="https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png" alt="avatar" />
                  <div className="details">
                      <span className="name">Anonymous</span>
                    <span className="date">{moment(post?.created_at).fromNow()}</span>
                  </div>
                </>
            ) : (
                <>
                  <img src={post?.avatar} alt="avatar" />
                  <div className="details">
                    <Link
                        to={`/profile/${post?.user_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <span className="name">{post?.username}</span>
                    </Link>
                    <span className="date">{moment(post?.created_at).fromNow()}</span>
                  </div>
                </>
            )}
          </div>
          <div>
            <IconButton onClick={handleMenuOpen}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              {showDeleteButton && (
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              )}
            </Menu>
          </div>
        </div>
        <div className="title">
          <h3>{post?.title}</h3>
        </div>
        <div className="content">
          <p>{post?.content}</p>
          {post.image_array && post.image_array.map((imageUrl, index) => (
              <img src={imageUrl} alt={`Image ${index}`} />
          ))}
        </div>
        <div className="info">
          {isLoading ? (
              "loading"
          ) : data?.data?.user_vote === "" ? (
              <>
                <div className="item" onClick={() => handleVote("up")}>
                  <ThumbUpOutlinedIcon />
                  {data?.data?.upvote}
                </div>
                <div className="item" onClick={() => handleVote("down")}>
                  <ThumbDownOutlinedIcon />
                  {data?.data?.downvote}
                </div>
              </>
          ) : data?.data?.user_vote=== "up" ? (
              <>
                <div className="item" onClick={() => handleVote("up")}>
                  <ThumbUpIcon style={{ color: "green" }} />
                  {data?.data?.upvote}
                </div>
                <div className="item" onClick={() => handleVote("down")}>
                  <ThumbDownOutlinedIcon />
                  {data?.data?.downvote}
                </div>
              </>
          ): data?.data?.user_vote === "down" ? (
              <>
                <div className="item" onClick={() => handleVote("up")}>
                  <ThumbUpOutlinedIcon />
                  {data?.data?.upvote}
                </div>
                <div className="item" onClick={() => handleVote("down")}>
                  <ThumbDownIcon style={{ color: "red" }} />
                  {data?.data?.downvote}
                </div>
              </>
          ) : (
              <>
                <div className="item" onClick={() => handleVote("up")}>
                  <ThumbUpOutlinedIcon />
                  {data?.upvote}
                </div>
                <div className="item" onClick={() => handleVote("down")}>
                  <ThumbDownOutlinedIcon />
                  {data?.downvote}
                </div>
              </>
            )}

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
