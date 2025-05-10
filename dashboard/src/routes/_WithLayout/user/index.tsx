import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { useState } from "react";
import {
  useDeleteClientUser,
  useDeleteDashboardUser,
  useGetBusOwners,
  useGetHotelOwners,
  useGetTravelAgents,
  useGetTravelers,
} from "./-queries";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { queryClient } from "../../__root";

export const Route = createFileRoute("/_WithLayout/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: hotelOwnerData,
    isLoading: isLoadingHotelOwner,
    refetch: refetchHotelOwner,
  } = useGetHotelOwners(true);

  const {
    data: busOwnerData,
    isLoading: isLoadingBusOwner,
    refetch: refetchBusOwner,
  } = useGetBusOwners(false);

  const {
    data: travelerData,
    isLoading: isLoadingTraveler,
    refetch: refetchTraveler,
  } = useGetTravelers(false);

  const {
    data: travelAgentData,
    isLoading: isLoadingTravelAgent,
    refetch: refetchTravelAgent,
  } = useGetTravelAgents(false);

  const { mutateAsync: mutateClientDelete } = useDeleteClientUser();
  const { mutateAsync: mutateDashboardDelete } = useDeleteDashboardUser();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userDetails, setUserDetails] = useState({ type: "", id: 0 });

  const deleteUser = () => {
    switch (userDetails.type) {
      case "client":
        mutateClientDelete(userDetails.id, {
          onSuccess: () => {
            refetchTravelAgent();
            refetchTraveler();
          },
        });
        break;

      case "dashboard":
        mutateDashboardDelete(userDetails.id, {
          onSuccess: () => {
            refetchBusOwner();
            refetchHotelOwner();
          },
        });
        break;
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-4xl font-medium">YatriKo Users</h2>
      </div>
      <Tabs defaultValue="Hotel Owners" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="Hotel Owners" onClick={() => refetchHotelOwner()}>
            Hotel Owners
          </TabsTrigger>
          <TabsTrigger value="Bus Owners" onClick={() => refetchBusOwner()}>
            Bus Owners
          </TabsTrigger>
          <TabsTrigger value="Travelers" onClick={() => refetchTraveler()}>
            Travelers
          </TabsTrigger>
          <TabsTrigger
            value="Travel Agents"
            onClick={() => refetchTravelAgent()}
          >
            Travel Agents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Hotel Owners">
          {isLoadingHotelOwner ? (
            <div>loading...</div>
          ) : (
            <Table className="mt-4">
              <TableHeader>
                <TableRow className="bg-[#26465333] hover:bg-[#26465325]">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>No. of Hotels</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotelOwnerData &&
                  hotelOwnerData.data.map((hotelOwner, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{hotelOwner.name}</TableCell>
                      <TableCell>{hotelOwner.email}</TableCell>
                      <TableCell>{hotelOwner._count.hotels}</TableCell>
                      <TableCell
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDeleteModal(true);
                          setUserDetails({
                            type: "dashboard",
                            id: hotelOwner.id,
                          });
                        }}
                      >
                        <Trash2 color="red" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        <TabsContent value="Bus Owners">
          {isLoadingBusOwner ? (
            <div>loading...</div>
          ) : (
            <Table className="mt-4">
              <TableHeader>
                <TableRow className="bg-[#26465333] hover:bg-[#26465325]">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>No. of Buses</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busOwnerData &&
                  busOwnerData.data.map((busOwner, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{busOwner.name}</TableCell>
                      <TableCell>{busOwner.email}</TableCell>
                      <TableCell>{busOwner._count.buses}</TableCell>
                      <TableCell
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDeleteModal(true);
                          setUserDetails({
                            type: "dashboard",
                            id: busOwner.id,
                          });
                        }}
                      >
                        <Trash2 color="red" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        <TabsContent value="Travelers">
          {isLoadingTraveler ? (
            <div>loading...</div>
          ) : (
            <Table className="mt-4">
              <TableHeader>
                <TableRow className="bg-[#26465333] hover:bg-[#26465325]">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone number</TableHead>
                  <TableHead>No. of Bus Bookings</TableHead>
                  <TableHead>No. of Hotel Bookings</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {travelerData &&
                  travelerData.data.map((traveler, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{traveler.name}</TableCell>
                      <TableCell>{traveler.email}</TableCell>
                      <TableCell>{traveler.phoneNumber}</TableCell>
                      <TableCell>{traveler._count.busBookings}</TableCell>
                      <TableCell>{traveler._count.hotelBookings}</TableCell>
                      <TableCell
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDeleteModal(true);
                          setUserDetails({
                            type: "client",
                            id: traveler.id,
                          });
                        }}
                      >
                        <Trash2 color="red" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        <TabsContent value="Travel Agents">
          {isLoadingTravelAgent ? (
            <div>loading...</div>
          ) : (
            <Table className="mt-4">
              <TableHeader>
                <TableRow className="bg-[#26465333] hover:bg-[#26465325]">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone number</TableHead>
                  <TableHead>No. of Bus Bookings</TableHead>
                  <TableHead>No. of Hotel Bookings</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {travelAgentData &&
                  travelAgentData.data.map((travelAgent, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{travelAgent.name}</TableCell>
                      <TableCell>{travelAgent.email}</TableCell>
                      <TableCell>{travelAgent.phoneNumber}</TableCell>
                      <TableCell>{travelAgent._count.busBookings}</TableCell>
                      <TableCell>{travelAgent._count.hotelBookings}</TableCell>
                      <TableCell
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDeleteModal(true);
                          setUserDetails({
                            type: "client",
                            id: travelAgent.id,
                          });
                        }}
                      >
                        <Trash2 color="red" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>

      <Dialog
        open={openDeleteModal}
        onOpenChange={() => setOpenDeleteModal(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this user?
            </DialogTitle>
            <DialogDescription className="my-4">
              This action cannot be undone. This will permanently delete the
              user and remove their data from our servers.
            </DialogDescription>
            <div className="flex gap-2">
              <Button
                className="grow cursor-pointer"
                onClick={() => setOpenDeleteModal(false)}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                className="grow bg-red-600 hover:bg-red-500 cursor-pointer"
                onClick={() => {
                  setOpenDeleteModal(false), deleteUser();
                }}
              >
                Delete
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
