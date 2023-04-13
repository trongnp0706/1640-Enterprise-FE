import { useQueryClient } from "@tanstack/react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./category.scss";

const Category = ({ category }) => {
  const queryClient = useQueryClient();

  // const deleteMutation = useMutation(
  //     (postData) => {
  //         return makeRequest.delete("idea/delete", { data: postData });
  //     },
  //     {
  //         onSuccess: () => {
  //             // Invalidate and refetch
  //             queryClient.invalidateQueries(["posts"]);
  //         },
  //     }
  // );
  //
  // const handleDelete = () => {
  //     console.log(post?.id);
  //     deleteMutation.mutate({ id: post?.id });
  // };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDeleteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteButtonClick = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="manage-title">
      <div className="manage-title-item">
        <span>{category.category_name}</span>
        <DeleteForeverIcon
          style={{ marginLeft: "55%" }}
          onClick={handleDeleteClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDeleteButtonClick}>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <hr />
      <div className="manage-title-item-txt">
        <span>32 ideas already posted</span>
      </div>
    </div>
  );
};

export default Category;
