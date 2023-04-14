import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {PageContext} from "../../context/pageContext";
import {useQueryClient} from "@tanstack/react-query";

const LeftBar = () => {

    const { currentUser } = useContext(AuthContext);
    const { currentPage, setCurrentPage } = useContext(PageContext);
    const queryClient = useQueryClient();
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img
                            src={currentUser?.data?.user?.avatar}
                            alt=""
                        />
                        <span>{currentUser?.data?.user?.username}</span>
                    </div>
                    <hr />
                    <Link to={`/`}>
                        <div className="item">
                            <span>Latest Posts</span>
                        </div>
                    </Link>
                    <Link to={`/popular`}>
                    <div className="item">
                        <span>Most Popular Posts</span>
                    </div>
                    </Link>
                    <Link to={`/view`}>
                    <div className="item">
                        <span>Most Viewed Post</span>
                    </div>
                    </Link>
                    <div className="item">
                        <span>Statistics</span>
                    </div>
                    <hr />
                        <div>
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span> Page {currentPage} </span>
                            <button
                                onClick={handleNextPage}
                            >
                                Next
                            </button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
