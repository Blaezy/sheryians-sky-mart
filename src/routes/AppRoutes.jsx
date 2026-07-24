import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import AuthLayout from "../layout/AuthLayout";
import ProtectedLayout from "../layout/ProtectedLayout";
import MainLayout from "../layout/MainLayout";
import Products from "../pages/Products";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import ProductDetails from "../pages/ProductDetails";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <PublicLayout />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout/>,
      children:[
        {
          path:"",
          element:<MainLayout/>,
          children:[
            {
              path:"",
              element:<Home/>
            },
            {
              path:"products",
              element:<Products/>
            },
            {
              path:"about",
              element:<About/>
            },
            {
              path:"profile",
              element:<Profile/>
            },
            {
              path:"cart",
              element:<Cart/>
            },
            {
              path:"wishlist",
              element:<Wishlist/>
            },
            {
              path:"products/:uniqueId",
              element:<ProductDetails/>
            }
          ]
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
