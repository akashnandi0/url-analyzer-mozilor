import { createBrowserRouter, redirect, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Summary from "./pages/summary";
import { isTokenValid } from "./utils/storage";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />; // Redirect to login if token is invalid
  } else {
    console.log(1, "Token is valid");
    return children;
  }
};
const protectedRoute = async () => {
  const isValid = await isTokenValid();
  if (isValid) {
    throw redirect("/"); // Redirect to home if token is valid
  }
  console.log("Token is invalid or expired");
  return null; // Allow access to login page if token is invalid
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
    loader: protectedRoute,
  },
  {
    path: "/signup",
    element: <Signup />,
    loader: protectedRoute,
  },
  {
    path: "/summary/:id",
    element: (
      <PrivateRoute>
        <Summary />
      </PrivateRoute>
    ),
  },
]);
