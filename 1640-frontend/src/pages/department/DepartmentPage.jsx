import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Departments from "../../components/departments/Departments";
import "./departmentPage.scss";
import {makeRequest} from "../../axios";

const DepartmentPage = () => {
  const queryClient = useQueryClient();
  const [ticker, setTicker] = useState("");
  const [department, setDepartment] = useState("");
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const [addAnchorEl, setAddAnchorEl] = useState(null);

  const handleAddClick = (event) => {
    setAddAnchorEl(event.currentTarget);
    setShowMenuAdd(true);
  };

    const mutation = useMutation(
        (newDepartment) => {
            return makeRequest.post("department/add", newDepartment);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["departments"]);
            },
        }
    );

  const handleAddClose = () => {
    setAddAnchorEl(null);
    setShowMenuAdd(false);
    mutation.mutate({id: ticker, department_name: department})
    setTicker("");
    setDepartment("");
  };

    const handleAddCloseMenu = () => {
        setAddAnchorEl(null);
        setShowMenuAdd(false);
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
          onClose={handleAddCloseMenu}
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
              Ticker
            </label>
            <input
              type="text"
              onChange={(e) => setTicker(e.target.value)}
              value={ticker}
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
              Department Name
            </label>
            <input
              type="text"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
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

export default DepartmentPage;
