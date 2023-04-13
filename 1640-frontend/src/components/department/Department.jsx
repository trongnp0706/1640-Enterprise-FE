import { useQueryClient } from "@tanstack/react-query";
import "./department.scss";

const Department = ({ department }) => {
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
        <div className="manage-title">
            <div className="manage-title-item">
                <span>{department.department_name}</span>
            </div>
            <hr />
            <div className="manage-title-item-txt">
                <span>32 ideas already posted</span>
            </div>
        </div>
    );
};

export default Department;
