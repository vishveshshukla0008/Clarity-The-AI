import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./AppRoutes";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const App = () => {
  const { handleGetUser } = useAuth();

  async function fetchUser() {
    await handleGetUser();
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
