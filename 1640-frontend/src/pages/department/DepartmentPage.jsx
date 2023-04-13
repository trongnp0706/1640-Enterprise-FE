import { useQueryClient } from "@tanstack/react-query";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Departments from "../../components/departments/Departments";
import "./departmentPage.scss";

const DepartmentPage = () => {
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
        <Departments />
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
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
            },
          }}
        >
          <MenuItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontWeight: "bold", marginRight: "5px" }}>
              Label 1
            </label>
            <input
              type="text"
              style={{ width: "70%", height: "70%", borderRadius: "10px" }}
            />
          </MenuItem>

          <MenuItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontWeight: "bold", marginRight: "5px" }}>
              Label 2
            </label>
            <input
              type="text"
              style={{ width: "70%", height: "70%", borderRadius: "10px" }}
            />
          </MenuItem>
          <MenuItem>
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
            >
              Add
            </button>
          </MenuItem>
        </Menu>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
        <Menu
          anchorEl={deleteAnchorEl}
          keepMounted
          open={showMenuDelete}
          onClose={handleDeleteClose}
          sx={{
            "& .MuiMenuItem-root": {
              margin: "5px",
              width: "250px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
            },
          }}
        >
          <MenuItem>
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              You want to delete?
            </span>
          </MenuItem>
          <MenuItem>
            <button
              style={{
                width: "40%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                color: "black",
              }}
            >
              Yes
            </button>
            <button
              style={{
                marginLeft: "10px",
                width: "40%",
                height: "100%",
                backgroundColor: "black",
                border: "none",
                borderRadius: "10px",
                color: "white",
              }}
            >
              No
            </button>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default DepartmentPage;
