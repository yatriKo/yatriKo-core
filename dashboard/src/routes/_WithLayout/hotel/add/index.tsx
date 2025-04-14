import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
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
import { useState } from "react";
import { useUploadHotelImage, useUploadHotelInfo } from "../-queries";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_WithLayout/hotel/add/")({
  component: RouteComponent,
});

const hotelFormSchema = z.object({
  hotelName: z.string().min(1, "Hotel name is required"),
  hotelNumber: z.string().min(1, "Hotel number is required"),
  hotelLocation: z.string().min(1, "Hotel location is required"),
  picture: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Hotel image is required"),
  rooms: z.object({
    standard: z
      .object({
        price: z.number(),
        numberOfRoom: z.number().min(0, "Number of rooms cannot be negative"),
      })
      .refine((data) => data.numberOfRoom === 0 || data.price >= 1, {
        message: "Price must be at least 1 when rooms are available",
        path: ["price"],
      }),
    deluxe: z
      .object({
        price: z.number(),
        numberOfRoom: z.number().min(0, "Number of rooms cannot be negative"),
      })
      .refine((data) => data.numberOfRoom === 0 || data.price >= 1, {
        message: "Price must be at least 1 when rooms are available",
        path: ["price"],
      }),
    premium: z
      .object({
        price: z.number(),
        numberOfRoom: z.number().min(0, "Number of rooms cannot be negative"),
      })
      .refine((data) => data.numberOfRoom === 0 || data.price >= 1, {
        message: "Price must be at least 1 when rooms are available",
        path: ["price"],
      }),
  }),
});

type HotelFormValues = z.infer<typeof hotelFormSchema>;

function RouteComponent() {
  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      hotelName: "",
      hotelNumber: "",
      hotelLocation: "",
      rooms: {
        standard: { price: 0, numberOfRoom: 0 },
        deluxe: { price: 0, numberOfRoom: 0 },
        premium: { price: 0, numberOfRoom: 0 },
      },
    },
  });

  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const { mutateAsync: uploadHotelImage } = useUploadHotelImage();
  const { mutateAsync: uploadHotel } = useUploadHotelInfo();

  const onSubmit = (data: HotelFormValues) => {
    const formData = new FormData();
    formData.append("image", data.picture[0]);

    const rooms = data.rooms;

    const roomType = Object.entries(rooms)
      .filter(([_, value]) => value.numberOfRoom > 0)
      .map(([key, value]) => ({ type: key, ...value }));

    uploadHotelImage(formData, {
      onSuccess: (img) => {
        uploadHotel(
          {
            hotelImage: [img.url],
            location: data.hotelLocation,
            name: data.hotelName,
            phoneNumber: data.hotelNumber,
            roomType: roomType,
          },
          {
            onSuccess: () => {
              router.navigate({ to: "/hotel" });
              toast("Hotel has been created", {
                description: "Hotel has been successfully created",
              });
            },
          }
        );
      },
    });
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 items-center mb-6">
        <Link to="/hotel">
          <ChevronLeft />
        </Link>
        <h1 className="text-4xl font-medium">Add Hotel</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full max-w-md"
        >
          {/* Hotel Details */}
          <FormField
            control={form.control}
            name="hotelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hotel name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotelNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hotel number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotelLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hotel location" {...field} />
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
                <FormLabel>Hotel Picture</FormLabel>
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

          {/* Room Type Inputs */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Room Types</h3>

          {(["standard", "deluxe", "premium"] as const).map((roomKey) => (
            <div key={roomKey} className="space-y-4 p-4 border rounded-lg">
              <h4 className="text-lg font-medium capitalize">{roomKey} Room</h4>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`rooms.${roomKey}.price`}
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
                              form.getValues(`rooms.${roomKey}.numberOfRoom`) >
                              0
                            ) {
                              form.trigger(`rooms.${roomKey}.price`);
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
                  name={`rooms.${roomKey}.numberOfRoom`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. of Rooms</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Number of rooms"
                          value={field.value}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            field.onChange(value);
                            form.trigger(`rooms.${roomKey}.price`);
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
