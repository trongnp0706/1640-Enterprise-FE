import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import {Link} from "react-router-dom";

const LeftBar = () => {

    const { currentUser } = useContext(AuthContext);

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
                    <div className="item">
                        <span>
                            prev 1 next
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
