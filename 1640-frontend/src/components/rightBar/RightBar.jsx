import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import "./rightBar.scss";
import React, {useContext, useState} from "react";
import {TermContext} from "../../context/termContext";

const RightBar = () => {

  const { termConfirm, setTermConfirm } = useContext(TermContext);
  const handleTermConfirm = () => {
    setTermConfirm((prev) => !prev);
  }

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <div className="checkbox" onClick={handleTermConfirm}>
            {termConfirm ? (
                <>
                  <CheckBoxIcon/>
                </>
            ) : (
                <>
                  <CheckBoxOutlineBlankIcon/>
                </>
            )}
          </div>
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
