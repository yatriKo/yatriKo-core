import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { Bus, Hotel, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/_WithLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getRole, token } = useAuth();
  const router = useRouter();

  if (!token) {
    router.navigate({ to: "/" });
  }

  return (
    <main>
      <div className="bg-[#264653] w-[230px] fixed left-0 h-screen p-4 flex flex-col">
        <h1 className="text-[#FEFAE0] text-4xl">Yatriको</h1>
        <Link
          to="/dashboard"
          className="[&.active]:bg-amber-300 px-4 text-white mt-4 h-10 rounded-md flex gap-1 items-center"
        >
          <LayoutDashboard size={24} />
          Dashboard
        </Link>
        {getRole() === "HotelOwner" ? (
          <Link
            to="/hotel"
            className="[&.active]:bg-amber-300 px-4 text-white mt-4 h-10 rounded-md flex gap-1 items-center"
          >
            <Hotel size={24} />
            Hotel
          </Link>
        ) : (
          <Link
            to="/bus"
            className="[&.active]:bg-amber-300 px-4 text-white mt-4 h-10 rounded-md flex gap-1 items-center"
          >
            <Bus size={24} />
            bus
          </Link>
        )}
      </div>
      <div className="px-8 pl-[264px] py-16 w-full">
        <Outlet />
      </div>
    </main>
  );
}
