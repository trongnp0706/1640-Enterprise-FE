import ManageItem from "../manageItem/ManageItem";
import "./manageItems.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const ManageItems = () => {
    const { isLoading, error, data } = useQuery(["categories"], () =>
        makeRequest.get("category/all").then((res) => {
            console.log(res?.data?.data)
            return res?.data?.data;
        })
    );

    return (
        <div className="categories">
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "loading"
                    : data.map((category) => <ManageItem category={category} key={category.id} />)}
        </div>
    );
};

export default ManageItems;
