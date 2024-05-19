import { Suspense } from "react";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RoutLayout from "./pages/RoutLayout";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";

const Add = React.lazy(() => import('./pages/Add'));
const Edit = React.lazy(() => import('./pages/Edit'));
const Details = React.lazy(() => import('./pages/Details'));





const postParamHandler = ({params}) => {
    if (isNaN(params.id)) {
        throw new Response("Bad Request", {
            statusText: "please make sure to insert correct post ID",
            status: 400,
          });
    }
}

const router = createBrowserRouter([

    {
        path: "/", element: <RoutLayout />,

        errorElement: <ErrorPage />,

        children: [
            { index: true, element: <Index /> },
            { path: "post", element: <Index /> },
            {
              path: "post/add",
              element: (
                <Suspense fallback="loading please wait...">
                  <Add />
                </Suspense>
              ),
            },
            {
              path: "post/:id",
              element: (
                <Suspense fallback="loading please wait...">
                  <Details />
                </Suspense>
              ),
              loader: postParamHandler,
            },
            {
              path: "post/:id/edit",
              element: (
                <Suspense fallback="loading please wait...">
                  <Edit />
                </Suspense>
              ),
              loader: postParamHandler,
            },
          ],
         
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
        <RouterProvider router={router} />
  </Provider>
);