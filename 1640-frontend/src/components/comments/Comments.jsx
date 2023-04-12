import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

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
        mutation.mutate({ content: desc, is_anonymous, user_id: currentUser.data.user.id, idea_id: postId });
        setDesc("");
    };

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.data.user.avatar} alt="" />
                <input
                    type="text"
                    placeholder="write a comment"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : data.data.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <img src={comment.avatar} alt="" />
                            <div className="info">
                                <span>{comment.username}</span>
                                <p>{comment.content}</p>
                            </div>
                            <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
                        </div>
                    ))}
        </div>
    );
};

export default Comments;
