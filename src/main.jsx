import React from "react";
import ReactDOM from "react-dom/client";
import Index, { loader as todayLoader } from "./pages/Index";
import Tomorrow, { loader as tomorrowLoader } from "./pages/Tomorrow";
import Yesterday,{loader as yesterdayLoader} from "./pages/Yesterday";
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
            {
              path:"/tomorrow",
              element:<Tomorrow/>,
              loader:tomorrowLoader
            },
            {
              path:"/yesterday",
              element:<Yesterday/>,
              loader:yesterdayLoader
            }
          ],
        },
      ])}
    />
  </React.StrictMode>
);
