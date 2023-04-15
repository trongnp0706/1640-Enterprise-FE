import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/img.png";
import { AuthContext } from "../../context/authContext";
import { PageContext } from "../../context/pageContext";
import "./leftBar.scss";

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
            <img src={currentUser?.data?.user?.avatar} alt="" />
            <span>{currentUser?.data?.user?.username}</span>
          </div>
          <hr />
          <Link
            to={`/`}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <div className="item">
              <span>Latest Posts</span>
            </div>
            <div class="image-and-title">
              <div className="image">
                <img src={Image} alt=""></img>
              </div>
              <div className="title">
                <span>title</span>
                <p>49 votes, 28 comments, Mar 26</p>
              </div>
            </div>
          </Link>
          <Link
            to={`/popular`}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <div className="item">
              <span>Most Popular Posts</span>
            </div>
            <div class="image-and-title">
              <div className="image">
                <img src={Image} alt=""></img>
              </div>
              <div className="title">
                <span>title</span>
                <p>49 votes, 28 comments, Mar 26</p>
              </div>
            </div>
          </Link>
          <Link
            to={`/view`}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <div className="item">
              <span>Most Viewed Post</span>
            </div>
            <div class="image-and-title">
              <div className="image">
                <img src={Image} alt=""></img>
              </div>
              <div className="title">
                <span>title</span>
                <p>49 votes, 28 comments, Mar 26</p>
              </div>
            </div>
          </Link>
          <div className="item">
            <span>Statistics</span>
          </div>
          <hr />
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </button>
            <span className="pagination-current-page"> {currentPage}</span>
            <button className="pagination-button" onClick={handleNextPage}>
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
