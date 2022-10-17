import {Outlet, Link} from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";

const Layout = () => {
    return(
        <>
        <NavigationBar/>
        <Outlet />
        </>
    )
};

export default Layout;
