import LogoutIcon from "@mui/icons-material/Logout";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import "./navbar.scss";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const userId = currentUser?.data?.user?.id;
  console.log(currentUser);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log("Logout failed with error:" + err);
    }
  };

  const getStorageChange = (e) => {
    console.log(e.data)
  }

  useEffect(() => {
    window.addEventListener('storage', getStorageChange)

    return (window.removeEventListener ('storage', getStorageChange))
  }, [])

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>1640 Web Enterprise</span>
        </Link>
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="right">
        <Link to={`/profile/${userId}`} className="user">
          <img src={currentUser?.data?.user?.avatar} alt="" />
        </Link>
        <LogoutIcon onClick={handleClick} />
      </div>
    </div>
  );
};

export default Navbar;
