import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useContext, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [is_anonymous, setAnonymous] = useState(false);

  const { isLoading, error, data } = useQuery(["comments", postId], () =>
    makeRequest.post("comment/all", { idea_id: postId }).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("comment/add", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({
      content: desc,
      is_anonymous,
      user_id: currentUser.data.user.id,
      idea_id: postId,
    });
    setDesc("");
  };

  const handleAnonymous = () => {
    setAnonymous((prev) => !prev);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteButtonClick = () => {
    // Implement delete functionality here
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="comments">
      <hr />
      <div className="write">
        <img
          src={currentUser.data.user.avatar}
          alt=""
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {is_anonymous ? (
          <>
            <ToggleOnIcon
              style={{ fontSize: "30px" }}
              onClick={handleAnonymous}
            />
            <span>Anonymous</span>
          </>
        ) : (
          <>
            <ToggleOffOutlinedIcon
              style={{ fontSize: "30px" }}
              onClick={handleAnonymous}
            />
            <span>Anonymous</span>
          </>
        )}
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data && data.data
        ? data.data.map((comment) => (
            <div className="comment" key={comment.id}>
              {comment.is_anonymous ? (
                <>
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png"
                    alt=""
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  />
                  <div className="info">
                    <span>Anonymous</span>
                    <span className="date">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                    <p>{comment.content}</p>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={comment.avatar}
                    alt=""
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  />
                  <div className="info">
                    <span>{comment.username}</span>
                    <span className="date">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                    <p>{comment.content}</p>
                  </div>
                </>
              )}

              <MoreHorizIcon
                style={{
                  alignSelf: "center",
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                onClick={handleMoreIconClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDeleteButtonClick}>
                  <DeleteIcon/>
                </MenuItem>
              </Menu>
            </div>
          ))
        : null}
    </div>
  );
};

export default Comments;
