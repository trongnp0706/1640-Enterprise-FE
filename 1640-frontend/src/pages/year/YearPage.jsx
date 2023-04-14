import Menu from "@mui/material/Menu";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Years from "../../components/years/Years";
import "./yearPage.scss";

const YearPage = () => {
  const queryClient = useQueryClient();
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const [showMenuDelete, setShowMenuDelete] = useState(false);
  const [addAnchorEl, setAddAnchorEl] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);

  const handleAddClick = (event) => {
    setAddAnchorEl(event.currentTarget);
    setShowMenuAdd(true);
  };

  const handleDeleteClick = (event) => {
    setDeleteAnchorEl(event.currentTarget);
    setShowMenuDelete(true);
  };

  const handleAddClose = () => {
    setAddAnchorEl(null);
    setShowMenuAdd(false);
  };

  const handleDeleteClose = () => {
    setDeleteAnchorEl(null);
    setShowMenuDelete(false);
  };
  return (
    <div className="container">
      <div className="Sidebar">
        <div className="Sidebar-item">
          <Link to={`/manage`} style={{ textDecoration: "none" }}>
            <span>Categories</span>
          </Link>
        </div>

        <div className="Sidebar-item">
          <Link to={`/manage/department`} style={{ textDecoration: "none" }}>
            <span>Department</span>
          </Link>
        </div>

        <div className="Sidebar-item">
          <Link to={`/manage/year`} style={{ textDecoration: "none" }}>
            <span>Academic Year</span>
          </Link>
        </div>
      </div>

      <hr />

      <div className="Items">
        <Years />
      </div>

      <div className="btn">
        <button className="add" onClick={handleAddClick}>
          Add
        </button>
        <Menu
          anchorEl={addAnchorEl}
          keepMounted
          open={showMenuAdd}
          onClose={handleAddClose}
          sx={{
            "& .MuiMenuItem-root": {
              margin: "5px",
              width: "300px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
            },
          }}
        >
          <div>
            <label style={{ fontWeight: "bold", margin: "10px" }}>
              Label 1
            </label>
            <input
              type="text"
              style={{
                width: "85%",
                height: "70%",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", margin: "10px" }}>
              Label 2
            </label>
            <input
              type="text"
              style={{
                width: "85%",
                height: "70%",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px",
              }}
            />
          </div>

          <div style={{ height: "40px" }}>
            <button
              style={{
                width: "50%",
                height: "100%",
                border: "none",
                backgroundColor: "black",
                borderRadius: "10px",
                color: "white",
                marginLeft: "27%",
              }}
              onClick={handleAddClose}
            >
              Add
            </button>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default YearPage;
