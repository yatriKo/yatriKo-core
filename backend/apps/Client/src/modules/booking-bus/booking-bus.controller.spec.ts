import { Test, TestingModule } from '@nestjs/testing';
import { BookingBusController } from './booking-bus.controller';

describe('BookingBusController', () => {
  let controller: BookingBusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingBusController],
    }).compile();

    controller = module.get<BookingBusController>(BookingBusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
