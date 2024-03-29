import Category from "../category/Category";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Categories = () => {
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
                    : data && data
                    ? data.map((category) => <Category category={category} key={category.id} />) : "No category, you can delete the table."}
        </div>
    );
};

export default Categories;
