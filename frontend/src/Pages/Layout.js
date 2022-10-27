import { Outlet, Link } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";

const Layout = () => {
  
  // if (window.location.href == "http://localhost:3000") {
  //   window.location.href = "http://localhost:3000/home"
  // }

  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default Layout;
