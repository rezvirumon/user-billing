import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Dashboard from "../pages/Home/DashboardComponents/Dashboard";
import AddCustomer from "../pages/AddCustomer/AddCustomer";
import Login from "../pages/Login&Registration/Login";
import Registration from "../pages/Login&Registration/Registration";
import PrivateRoute from './PrivateRoute';
import ListCustomers from "../pages/ListCustomers/ListCustomers";
import CustomerDetails from "../pages/ListCustomers/CustomerDetails";
import Billing from "../pages/CustomerBilling/Billing";
import Areas from "../pages/AreaFilter/Areas";
import MonthlyReports from "../pages/Reports/MonthlyReports";





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
                element: <PrivateRoute><Registration></Registration></PrivateRoute>
            },
            {
                path: '/addcustomer',
                element: <PrivateRoute><AddCustomer></AddCustomer></PrivateRoute>
            },
            {
                path: '/listcustomers',
                element: <PrivateRoute><ListCustomers></ListCustomers></PrivateRoute>
            },
            {
                path: '/customerdetails/:id',
                element: <PrivateRoute><CustomerDetails></CustomerDetails></PrivateRoute>
            },
            {
                path: '/billing',
                element: <PrivateRoute><Billing></Billing></PrivateRoute>
            },
            {
                path: '/area',
                element: <PrivateRoute><Areas></Areas></PrivateRoute>
            },
            {
                path: '/reports',
                element: <PrivateRoute><MonthlyReports></MonthlyReports></PrivateRoute>
            }
        ]
    },
]);

export default router