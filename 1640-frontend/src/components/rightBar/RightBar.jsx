import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import React, { useContext } from "react";
import { TermContext } from "../../context/termContext";
import "./rightBar.scss";

const RightBar = () => {
  const { termConfirm, setTermConfirm } = useContext(TermContext);
  const handleTermConfirm = () => {
    setTermConfirm((prev) => !prev);
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <div className="checkbox" onClick={handleTermConfirm}>
            {termConfirm ? (
              <>
                <CheckBoxIcon />
              </>
            ) : (
              <>
                <CheckBoxOutlineBlankIcon />
              </>
            )}
          </div>
          <p>Terms & Conditions</p>
          <hr />
          <table>
            <tr>
              <td>User Agreement</td>
              <td>Content Policy</td>
            </tr>
            <tr>
              <td>Privacy Policy</td>
              <td>Moderator Code of Conduct</td>
            </tr>
          </table>
          <hr />
          <span>1640 Web Enterprise © 2023. All rights reserved</span>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
