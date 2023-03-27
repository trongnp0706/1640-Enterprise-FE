import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Button } from "@mui/material";

const PostCard = () => {
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="https://www.blexar.com/avatar.png" alt="avatar" />
            <div className="details">
              <span className="name">Chau Anh</span>
              <span className="date">Posted on March 27, 2023</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>This is a sample post created for example.</p>
          <img
            src="https://img.lovepik.com/photo/40013/4216.jpg_wh860.jpg"
            alt=""
          />
        </div>
        <div className="info">
          <div className="item">
            <FavoriteOutlinedIcon style={{ color: "red" }} />
            <FavoriteBorderOutlinedIcon />
            Likes
          </div>
          <div className="item">
            <TextsmsOutlinedIcon />
            See Comments
          </div>

          <div className="download">
            <Button>Download</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
