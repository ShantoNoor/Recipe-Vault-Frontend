import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./components/AuthProvider.jsx";
import { ThemeProvider } from "./components/ui/theme-provider.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Spinner from "./components/Spinner.jsx";
import { Toaster } from "./components/ui/sonner.jsx";

const Home = React.lazy(() => import("./pages/Home.jsx"));
const Recipes = React.lazy(() => import("./pages/Recipes.jsx"));
const ViewRecipe = React.lazy(() => import("./pages/ViewRecipe.jsx"));
const AddRecipe = React.lazy(() => import("./pages/AddRecipe/AddRecipe.jsx"));
const PurchaseCoin = React.lazy(() => import("./pages/PurchaseCoin.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/purchase-coin",
        element: (
          <PrivateRoute>
            <PurchaseCoin />
          </PrivateRoute>
        ),
      },
      {
        path: "view-recipe/:_id",
        element: (
          <PrivateRoute>
            <ViewRecipe />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      attribute="class"
      storageKey="vite-ui-theme"
    >
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <React.Suspense
              fallback={
                <div className="mt-36">
                  <Spinner />
                </div>
              }
            >
              <RouterProvider router={router} />
            </React.Suspense>
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
