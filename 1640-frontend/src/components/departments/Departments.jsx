import Department from "../department/Department";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Departments = () => {
    const { isLoading, error, data } = useQuery(["departments"], () =>
        makeRequest.get("department/all").then((res) => {
            console.log(res?.data?.data)
            return res?.data?.data;
        })
    );

    return (
        <div className="department">
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "loading"
                    : data.map((department) => <Department department={department} key={department.id} />)}
        </div>
    );
};

export default Departments;
