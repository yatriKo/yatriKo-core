import { Hotel } from "@prisma/client"

export class findAllHotelDto{
    data: Hotel[],
    meta: {limit, offset},
}