import Year from "../year/Year";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Departments = () => {
    const { isLoading, error, data } = useQuery(["year"], () =>
        makeRequest.get("year/all").then((res) => {
            console.log(res?.data?.data)
            return res?.data?.data;
        })
    );

    return (
        <div className="year">
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "loading"
                    : data.map((year) => <Year year={year} key={year.id} />)}
        </div>
    );
};

export default Departments;