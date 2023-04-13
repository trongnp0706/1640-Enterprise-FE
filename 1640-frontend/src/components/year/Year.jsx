import { useQueryClient } from "@tanstack/react-query";
import "./year.scss";
import moment from "moment/moment";

const Year = ({ year }) => {
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
    const date = moment(year.closure_date).toDate().toDateString();
    return (
        <div className="manage-title">
            <div className="manage-title-item">
                <span>{year.academic_year}</span>
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
