import AuthLoader from "@/features/auth/components/authLoader";
import ProtectedAuth from "@/features/auth/components/ProtectedAuth";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import Dashboard from "@/features/chat/pages/Dashboard";
import About from "@/landing/pages/About";
import Home from "@/landing/pages/Home";
import RootLayout from "@/layouts/RootLayout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedAuth>
            <Home />
          </ProtectedAuth>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
