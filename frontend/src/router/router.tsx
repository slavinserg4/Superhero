import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import CreatePage from "../pages/CreatePage/CreatePage";
import HeroDetailsPage from "../pages/HeroDetailsPage/HeroDetailsPage";
import EditPage from "../pages/EditPage/EditPage";

export const router = createBrowserRouter([
    {
        path: "/", element:<MainLayout/>, children:[
            {index:true, element:<HomePage/>},
            {path:"/create", element:<CreatePage/>},
            {path:"/details/:id", element:<HeroDetailsPage/>},
            {path:"/edit/:id", element:<EditPage/>}
        ]
    }
])