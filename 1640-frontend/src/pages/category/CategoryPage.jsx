import { useQueryClient } from "@tanstack/react-query";
import Categories from "../../components/categories/Categories";
import "./categoryPage.scss";
import {Link} from "react-router-dom";

const CategoryPage = () => {
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
        <Categories />
      </div>

      <div className="btn">
        <button className="add">Add</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
};

export default CategoryPage;
