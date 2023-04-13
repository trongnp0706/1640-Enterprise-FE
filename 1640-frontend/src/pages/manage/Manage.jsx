import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Update from "../../components/update/Update";
import { AuthContext } from "../../context/authContext";
import "./manage.scss";
import ManageItems from "../../components/manageItems/ManageItems";

const Manage = () => {

    const queryClient = useQueryClient();
    return (
        <div className="container">
            <div className="grid">
                <div className="grid-row">
                    <div className="grid__column-4">

                        <div className="Sidebar">
                            <div className="Sidebar-item">
                                <a className="Sidebar-item-link" href="#">
                                    <i className="fa-solid fa-table-list"></i>
                                    Categories
                                </a>
                            </div>

                            <div className="Sidebar-item">
                                <a className="Sidebar-item-link" href="#">
                                    <i className="fa-solid fa-sitemap"></i>
                                    Department
                                </a>
                            </div>

                            <div className="Sidebar-item">
                                <a className="Sidebar-item-link" href="#">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                    Academic Year
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="grid__column-8">
                        <div className="add-category-btn">
                            <button className="btn">
                                <i className="fa-solid fa-file-circle-plus"></i>
                                Add a new category
                            </button>
                        </div>

                        <div className="Category">
                            <ManageItems />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manage;
