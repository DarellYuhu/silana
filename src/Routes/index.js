import React, { Fragment } from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// redux
import { useSelector } from "react-redux";

//constants
import { layoutTypes } from "../constants/layout";

// layouts
import NonAuthLayout from "../Layout/NonAuthLayout";
import VerticalLayout from "../Layout/VerticalLayout/index";
import HorizontalLayout from "../Layout/HorizontalLayout/index";
import { AuthProtected } from "./AuthProtected";

import { authProtectedRoutes, publicRoutes } from "./routes";

const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const Index = () => {
  const { layoutType } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
  }));

  const Layout = getLayout(layoutType);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        {publicRoutes.map((route, idx) => {
          return (
            <Route
              path={route.path}
              element={
                route.path === "/buat-surat" ? (
                  // <AuthProtected>
                  <Layout>{route.component}</Layout>
                ) : (
                  // </AuthProtected>
                  <NonAuthLayout>{route.component}</NonAuthLayout>
                )
              }
              key={idx}
              exact={true}
              loader={route.loader}
            />
          );
        })}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AuthProtected>
                <Layout>{route.component}</Layout>
              </AuthProtected>
            }
            key={idx}
            exact={true}
            loader={route?.loader}
          />
        ))}
      </Fragment>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
