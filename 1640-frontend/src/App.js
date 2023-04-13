import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LeftBar from "./components/leftBar/LeftBar";
import Navbar from "./components/navbar/Navbar";
import RightBar from "./components/rightBar/RightBar";
import { AuthContext } from "./context/authContext";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Manage from "./pages/manage/Manage";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import "./style.scss";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const LoggedInRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),

      children: [
        {
          path: "/manage",
          element: <Manage />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <LoggedInRoute>
          <Login />
        </LoggedInRoute>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
