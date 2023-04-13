import { useQueryClient } from "@tanstack/react-query";
import ManageItems from "../../components/manageItems/ManageItems";
import "./manage.scss";

const Manage = () => {
  const queryClient = useQueryClient();
  return (
    <div className="container">
      <div className="Sidebar">
        <div className="Sidebar-item">
          <span>Categories</span>
        </div>

        <div className="Sidebar-item">
          <span>Department</span>
        </div>

        <div className="Sidebar-item">
          <span>Academic Year</span>
        </div>
      </div>

      <hr/>

      <div className="Items">
        <ManageItems />
      </div>

      <div className="btn">
        <button className="delete">Delete</button>
        <button className="add">Add</button>
      </div>
    </div>
  );
};

export default Manage;
