import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Dashboard from "../pages/Home/DashboardComponents/Dashboard";
import AddCustomer from "../pages/AddCustomer/AddCustomer";
import Login from "../pages/Login&Registration/Login";
import Registration from "../pages/Login&Registration/Registration";
import PrivateRoute from './PrivateRoute';





const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <></>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/addcustomer',
                element: <PrivateRoute><AddCustomer></AddCustomer></PrivateRoute>
            }
        ]
    },
]);

export default router