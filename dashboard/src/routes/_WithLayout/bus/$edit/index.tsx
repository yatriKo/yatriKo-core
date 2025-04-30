export const Route = createFileRoute("/_WithLayout/bus/$edit/")({
  component: RouteComponent,
});

import {
  createFileRoute,
  Link,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { DatePicker } from "../../../../../components/ui/datePicker";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import {
  useGetIndividualBus,
  useUploadBusImage,
  useUploadBusInfo,
} from "../-queries";
import dayjs from "dayjs";

const busFormSchema = z.object({
  from: z.string().min(1, "From location is required"),
  to: z.string().min(1, "To location is required"),
  date: z.date(),
  busNumber: z.string().min(1, "Bus number is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  picture: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Bus image is required"),
  busSeats: z.object({
    Front: z
      .object({
        price: z.number(),
        numberOfSeats: z.number().min(0, "Cannot be negative"),
      })
      .refine((data) => data.numberOfSeats === 0 || data.price >= 1, {
        message: "Price must be at least 1 when seats are available",
        path: ["price"],
      }),
    Middle: z
      .object({
        price: z.number(),
        numberOfSeats: z.number().min(0, "Cannot be negative"),
      })
      .refine((data) => data.numberOfSeats === 0 || data.price >= 1, {
        message: "Price must be at least 1 when seats are available",
        path: ["price"],
      }),
    Back: z
      .object({
        price: z.number(),
        numberOfSeats: z.number().min(0, "Cannot be negative"),
      })
      .refine((data) => data.numberOfSeats === 0 || data.price >= 1, {
        message: "Price must be at least 1 when seats are available",
        path: ["price"],
      }),
  }),
});

type BusFormValues = z.infer<typeof busFormSchema>;

function RouteComponent() {
  const { edit } = useParams({ from: "/_WithLayout/bus/$edit/" });

  const { data, isSuccess, isFetching } = useGetIndividualBus(edit);

  useEffect(() => {
    if (data) {
      console.log(data.data.busSeats);
      const groupedSeats: Record<
        string,
        { price: number; numberOfSeats: number }
      > = {
        Front: { price: 0, numberOfSeats: 0 },
        Middle: { price: 0, numberOfSeats: 0 },
        Back: { price: 0, numberOfSeats: 0 },
      };

      data.data.busSeats.forEach((seat) => {
        const type = seat.seatType;
        if (groupedSeats[type]) {
          groupedSeats[type].numberOfSeats += 1;
          groupedSeats[type].price = seat.price;
        }
      });

      form.reset({
        busNumber: data.data.busNumber,
        date: dayjs(data.data.date).toDate(),
        from: data.data.from,
        phoneNumber: data.data.phoneNumber,
        to: data.data.to,
        busSeats: groupedSeats,
      });

      setImagePreview(data.data.image[0]);
    }
  }, [isSuccess, isFetching]);

  const form = useForm<BusFormValues>({
    resolver: zodResolver(busFormSchema),
    defaultValues: {
      from: "",
      to: "",
      date: new Date(),
      busNumber: "",
      phoneNumber: "",
      busSeats: {
        Front: { price: 0, numberOfSeats: 0 },
        Middle: { price: 0, numberOfSeats: 0 },
        Back: { price: 0, numberOfSeats: 0 },
      },
    },
  });

  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutateAsync: uploadImage } = useUploadBusImage();
  const { mutateAsync: uploadInfo } = useUploadBusInfo();

  const handleImageChange = (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = (data: BusFormValues) => {
    const formData = new FormData();
    formData.append("image", data.picture[0]);

    const seats = data.busSeats;
    const busSeats = Object.entries(seats)
      .filter(([_, val]) => val.numberOfSeats > 0)
      .map(([type, val]) => ({
        seatType: type.charAt(0).toUpperCase() + type.slice(1),
        ...val,
      }));

    uploadImage(formData, {
      onSuccess: (img) => {
        uploadInfo(
          {
            from: data.from,
            to: data.to,
            date: dayjs(data.date).format("DD/MM/YYYY"),
            busNumber: data.busNumber,
            phoneNumber: data.phoneNumber,
            image: [img.url],
            busSeats,
          },
          {
            onSuccess: () => {
              toast("Bus has been added", {
                description: "Successfully created bus entry",
              });
              router.navigate({ to: "/bus" });
            },
          }
        );
      },
    });
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 items-center mb-6">
        <Link to="/bus">
          <ChevronLeft />
        </Link>
        <h1 className="text-4xl font-medium">Edit Bus</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full max-w-md"
        >
          {/* Bus Details */}
          <FormField
            control={form.control}
            name="busNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bus Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bus number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="Enter origin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bus Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handleImageChange(e.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-w-xs w-[250px] rounded border"
            />
          )}

          {/* Seat Types */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Seat Types</h3>
          {(["Front", "Middle", "Back"] as const).map((seatKey) => (
            <div key={seatKey} className="space-y-4 p-4 border rounded-lg">
              <h4 className="text-lg font-medium capitalize">{seatKey} Seat</h4>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`busSeats.${seatKey}.price`}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Price"
                          value={field.value}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            field.onChange(value);
                            if (
                              form.getValues(
                                `busSeats.${seatKey}.numberOfSeats`
                              ) > 0
                            ) {
                              form.trigger(`busSeats.${seatKey}.price`);
                            }
                          }}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`busSeats.${seatKey}.numberOfSeats`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. of Seats</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Number of seats"
                          value={field.value}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            field.onChange(value);
                            form.trigger(`busSeats.${seatKey}.price`);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <Button type="submit" className="mt-6">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
