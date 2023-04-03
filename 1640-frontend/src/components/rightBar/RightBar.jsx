import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <CheckBoxIcon></CheckBoxIcon>
          <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
          <p>Terms & Conditions</p>
          <hr />
          <div className="user">
            <div className="userInfo">
              <span>User Agreement</span>
            </div>
            <div className="buttons">
              <span>User Agreement</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>User Agreement</span>
            </div>
            <div className="buttons">
              <span>User Agreement</span>
            </div>
          </div>
          <hr />
          <span>1640 Web Enterprise © 2023. All rights reserved</span>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
