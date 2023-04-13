import { useQueryClient } from "@tanstack/react-query";
import Years from "../../components/years/Years";
import "./yearPage.scss";
import {Link} from "react-router-dom";

const YearPage = () => {
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
        <Years />
      </div>

      <div className="btn">
        <button className="add">Add</button>
      </div>
    </div>
  );
};

export default YearPage;
