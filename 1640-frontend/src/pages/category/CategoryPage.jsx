import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Categories from "../../components/categories/Categories";
import "./categoryPage.scss";
import {makeRequest} from "../../axios";

const CategoryPage = () => {
  const queryClient = useQueryClient();
  const [ticker, setTicker] = useState("");
  const [category, setCategory] = useState("");
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const [addAnchorEl, setAddAnchorEl] = useState(null);

  const handleAddClick = (event) => {
    setAddAnchorEl(event.currentTarget);
    setShowMenuAdd(true);
  };

    const mutation = useMutation(
        (newCategory) => {
            return makeRequest.post("category/add", newCategory);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["categories"]);
            },
        }
    );

  const handleAddClose = () => {
    mutation.mutate({id: ticker, category_name: category})
    setAddAnchorEl(null);
    setShowMenuAdd(false);
    setTicker("");
    setCategory("");
  };

    const handleAddCloseMenu = () => {
        setAddAnchorEl(null);
        setShowMenuAdd(false);
        setTicker("");
        setCategory("");
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
        <Categories />
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
              Category Name
            </label>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
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

export default CategoryPage;
