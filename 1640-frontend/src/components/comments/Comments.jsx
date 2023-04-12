import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";
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

  return (
    <div className="comments">
      <hr />
      <div className="write">
        <img src={currentUser.data.user.avatar} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <ToggleOffOutlinedIcon style={{ fontSize: "30px" }} />
        <ToggleOnIcon style={{ fontSize: "30px" }} />
        <button onClick={handleClick}>Send</button>
      </div>
      <hr />
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data && data.data
        ? data.data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.avatar} alt="" />
              <div className="info">
                <span>{comment.username}</span>
                <span className="date">
                  {moment(comment.createdAt).fromNow()}
                </span>
                <p>{comment.content}</p>
              </div>
              <MoreHorizIcon
                style={{
                  alignSelf: "center",
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50%",
                }}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Comments;
