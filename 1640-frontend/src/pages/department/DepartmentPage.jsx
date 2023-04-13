import { useQueryClient } from "@tanstack/react-query";
import Departments from "../../components/departments/Departments";
import "./departmentPage.scss";
import {Link} from "react-router-dom";

const DepartmentPage = () => {
  const queryClient = useQueryClient();
  return (
    <div className="container">
      <div className="Sidebar">

        <div className="Sidebar-item">
            <Link to={`/manage`}>
                <span>Categories</span>
            </Link>
        </div>

          <div className="Sidebar-item">
              <Link to={`/manage/department`}>
                  <span>Department</span>
              </Link>
          </div>

          <div className="Sidebar-item">
              <Link to={`/manage/year`}>
                  <span>Academic Year</span>
              </Link>
          </div>
      </div>

      <hr/>

      <div className="Items">
        <Departments />
      </div>

      <div className="btn">
        <button className="add">Add</button>
      </div>
    </div>
  );
};

export default DepartmentPage;
