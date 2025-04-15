import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "../../components/ui/sonner";
import { AuthProvider } from "../context/AuthContext";

export const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </>
  ),
});
