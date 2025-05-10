export class UserDashboardDto {
  id: number;
  name: string;
  email: string;
  _count: { hotels?: number; buses?: number };
}
