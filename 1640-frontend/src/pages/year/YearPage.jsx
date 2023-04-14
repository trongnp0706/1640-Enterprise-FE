import Menu from "@mui/material/Menu";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Years from "../../components/years/Years";
import "./yearPage.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {makeRequest} from "../../axios";

const YearPage = () => {
  const queryClient = useQueryClient();
    const [year, setYear] = useState("");
    const [closure_date, setClosureDate] = useState("");
    const [date, setDate] = useState(new Date());
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const [addAnchorEl, setAddAnchorEl] = useState(null);

    const handleDateChange = (date) => {
        setDate(date);
        const parsedDate = date;

        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const hours = String(parsedDate.getHours()).padStart(2, '0');
        const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
        const seconds = String(parsedDate.getSeconds()).padStart(2, '0');

        const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

        setClosureDate(isoDateString);
    };

    const mutation = useMutation(
        (newYear) => {
            return makeRequest.post("year/add", newYear);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["years"]);
            },
        }
    );

    const handleAddClick = (event) => {
    setAddAnchorEl(event.currentTarget);
    setShowMenuAdd(true);
  };


  const handleAddClose = () => {
    setAddAnchorEl(null);
    setShowMenuAdd(false);
      mutation.mutate({academic_year: year, closure_date: closure_date})
      setYear("");
      setDate("");
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
              Year
            </label>
            <input
              type="text"
              onChange={(e) => setYear(e.target.value)}
              value={year}
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
              Closure Date
            </label>
              <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
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
