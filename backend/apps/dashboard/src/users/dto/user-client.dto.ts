export class UserClientDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  _count: { busBookings: number; hotelBookings: number };
}
