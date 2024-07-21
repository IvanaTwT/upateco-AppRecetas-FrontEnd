import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Contact from "../components/Contact";
import Layout from "./Layout";
import Recetas from "../components/recetas/Recetas"
import RecetaDetail from "../components/recetas/RecetaDetail"
import RecetaForm from "../components/recetas/RecetaForm"
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
                // element: (<ProtectedRoute>
                //           <Recetas/>
                //       </ProtectedRoute>),
                children: [
                    {
                        index: true,
                        element: <Recetas />,
                    },
                    {
                         path: ":id",
                         element: <RecetaDetail />,
                    },
                    {
                        path: "new",
                        element: <RecetaForm />,
                    },
                    {
                        path: "edit/:id",
                        element:<RecetaForm />,
                    },
                ]
            },
            {
                path: "/contact",
                element: (<ProtectedRoute>
                            <Contact />
                        </ProtectedRoute>)
            },
            {
                path: "*",
                element: <h1 className="title is-3">Not Found</h1>,
            },
        ],
    },
]);

export default Router;
