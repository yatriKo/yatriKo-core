import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useDeleteHotel, useGetBus } from "./-queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./../../../../components/ui/dialog";
import { Button } from "./../../../../components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { queryClient } from "../../__root";

export const Route = createFileRoute("/_WithLayout/bus/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useGetBus();

  const { mutateAsync, isPending } = useDeleteHotel();

  const { navigate } = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [hotelId, setHotelId] = useState(0);

  const deleteHotel = () => {
    mutateAsync(hotelId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getHotel"] });
      },
    });
  };

  return (
    <div>
      {isLoading || isPending ? (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-medium">Buses</h2>
            <Link
              to="/bus/add"
              className="bg-[#26465333] hover:bg-[#26465325] font-medium cursor-pointer flex px-4 py-2 rounded-md"
            >
              Add Bus
            </Link>
          </div>
          <Table className="mt-8">
            <TableHeader>
              <TableRow className="bg-[#26465333] hover:bg-[#26465325]">
                <TableHead>Bus Number</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.data.map((bus, idx) => (
                  <TableRow
                    key={idx}
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => navigate({ to: `/hotel/${bus.id}` })}
                  >
                    <TableCell>{bus.busNumber}</TableCell>
                    <TableCell>{bus.from}</TableCell>
                    <TableCell>{bus.to}</TableCell>
                    <TableCell>{bus.phoneNumber}</TableCell>
                    <TableCell
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDeleteModal(true);
                        setHotelId(bus.id);
                      }}
                    >
                      <Trash2 color="red" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Dialog
            open={openDeleteModal}
            onOpenChange={() => setOpenDeleteModal(false)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this hotel?
                </DialogTitle>
                <DialogDescription className="my-4">
                  This action cannot be undone. This will permanently delete
                  your hotel and remove your data from our servers.
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
                      setOpenDeleteModal(false), deleteHotel();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
