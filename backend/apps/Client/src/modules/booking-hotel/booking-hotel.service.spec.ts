import { Test, TestingModule } from '@nestjs/testing';
import { BookingHotelService } from './booking-hotel.service';

describe('BookingHotelService', () => {
  let service: BookingHotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingHotelService],
    }).compile();

    service = module.get<BookingHotelService>(BookingHotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
