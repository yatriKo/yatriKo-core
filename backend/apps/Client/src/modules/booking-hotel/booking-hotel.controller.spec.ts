import { Test, TestingModule } from '@nestjs/testing';
import { BookingHotelController } from './booking-hotel.controller';
import { BookingHotelService } from './booking-hotel.service';

describe('BookingHotelController', () => {
  let controller: BookingHotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingHotelController],
      providers: [BookingHotelService],
    }).compile();

    controller = module.get<BookingHotelController>(BookingHotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
