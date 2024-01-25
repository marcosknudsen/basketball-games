import React from "react";
import ReactDOM from "react-dom/client";
import Index, { loader as todayLoader } from "./pages/Index";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Index />,
              loader: todayLoader,
            },
          ],
        },
      ])}
    />
  </React.StrictMode>
);
