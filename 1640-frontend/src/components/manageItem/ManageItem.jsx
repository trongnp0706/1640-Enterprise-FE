import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {useContext, useEffect, useState} from "react";
import { makeRequest } from "../../axios";
import "./manageItem.scss";
import axios from "axios";


const ManageItem = ({ category }) => {

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

    return (
        <div className="Category-title">
            <div className="Category-title-item">
                <p>{category.category_name}</p>
                <i className="fa-solid fa-file-pen"></i>
                <i className="fa-solid fa-trash-can"></i>
            </div>
            <div className="Category-title-item-txt">
                <i className="fa-regular fa-lightbulb"></i>
                <p>32 ideas already posted</p>
            </div>
        </div>
    );
};

export default ManageItem;
