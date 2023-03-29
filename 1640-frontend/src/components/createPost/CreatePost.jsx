import "./createPost.scss";
import Image from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import Switch from "react-switch";
const CreatePost = () => {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.data?.user?.id;
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [user_id] = useState(userId);
    const [is_anonymous, setAnonymous] = useState(false);
    const [category_id, setCategory] = useState("CAT");
    const [academic_year, setAcademicYear] = useState("2022");

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("idea/add", newPost);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrls = [];
        if (files.length > 0) {
            for (const file of files) {
                const uploadData = await upload(file);
                const  imgUrl = uploadData?.data
                imgUrls.push(imgUrl);
            }
        }
        try {
            mutation.mutate({ title, content, image_array: imgUrls, is_anonymous, user_id, category_id, academic_year });
        }
        catch (error){
            console.log(error)
        }

        setContent("");
        setTitle("");
        setFiles([]);
    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={currentUser?.data?.user?.avatar} alt="" />
                        <input
                            type="text"
                            placeholder={`Post Title`}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                </div>
                <div className="mid-content">
                    <input
                        type="text"
                        placeholder={`What's on your mind ${currentUser?.data?.user?.username}?`}
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                </div>
                <div className="mid-image">
                    <div className="right">
                        {files.map((file, index) => (
                            <img key={index} className="file" alt="" src={URL.createObjectURL(file)} />
                        ))}
                        {files.map((file, index) => (
                            <HighlightOffIcon
                                id="deleteIcon"
                                onClick={() => {
                                    document.getElementById("file").remove();
                                }}
                            />
                        ))}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const selectedFiles = Array.from(e.target.files);
                                setFiles([...files, ...selectedFiles]);
                            }}
                            multiple
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div>
                            <Switch
                                // checked={this.state.checked}
                                // onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <p>Anonymous</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category-select">Category:</label>
                        <select id="category-select">
                            <option value="CAT">CAT</option>
                            <option value="DOG">DOG</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="academic-year-select">Academic Year:</label>
                        <select id="academic-year-select">
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                    <div className="right">
                        <SendIcon
                            onClick={handleClick}
                            style={{ color: "blue" }}
                        ></SendIcon>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
