import { Test, TestingModule } from '@nestjs/testing';
import { BookingBusService } from './booking-bus.service';

describe('BookingBusService', () => {
  let service: BookingBusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingBusService],
    }).compile();

    service = module.get<BookingBusService>(BookingBusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
