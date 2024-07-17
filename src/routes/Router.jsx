import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Contact from "../components/Contact";
import Layout from "./Layout";
import Recetas from "../components/recetas/Recetas"
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Auth/Login";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/recetas",
                element: (<ProtectedRoute>
                            <Recetas/>
                        </ProtectedRoute>)
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "*",
                element: <h1>Not Found</h1>,
            },
        ],
    },
]);

export default Router;
