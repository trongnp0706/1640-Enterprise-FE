import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./department.scss";
import {makeRequest} from "../../axios";

const Department = ({ department }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
      (departmentData) => {
        return makeRequest.delete("department/delete", { data: departmentData });
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["departments"]);
        },
      }
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDeleteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteButtonClick = () => {
    deleteMutation.mutate({ id: department?.id });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="manage-title">
      <div className="manage-title-item">
        <span>{department.department_name}</span>
        <div>
          <DeleteForeverIcon
            style={{ marginLeft: "50%" }}
            onClick={handleDeleteClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDeleteButtonClick}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
      <hr />
      <div className="manage-title-item-txt">
        <span>32 ideas already posted</span>
      </div>
    </div>
  );
};

export default Department;
