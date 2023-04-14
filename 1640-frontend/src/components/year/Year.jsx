import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import moment from "moment/moment";
import React, { useState } from "react";
import "./year.scss";
import {makeRequest} from "../../axios";

const Year = ({ year }) => {
  const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (yearData) => {
            return makeRequest.delete("year/delete", { data: yearData });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["years"]);
            },
        }
    );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDeleteClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteButtonClick = () => {
      deleteMutation.mutate({ academic_year: year?.academic_year });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const date = moment(year.closure_date).toDate().toDateString();
  return (
    <div className="manage-title">
      <div className="manage-title-item">
        <span>{year.academic_year}</span>
        <div>
          <DeleteForeverIcon
            style={{ marginLeft: "60%" }}
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
        <span>Closure Date: {date}</span>
      </div>
      <div className="manage-title-item-txt">
        <span>32 ideas already posted</span>
      </div>
    </div>
  );
};

export default Year;
