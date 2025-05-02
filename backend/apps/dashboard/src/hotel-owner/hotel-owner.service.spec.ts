import { Test, TestingModule } from '@nestjs/testing';
import { HotelOwnerService } from './hotel-owner.service';

describe('HotelOwnerService', () => {
  let service: HotelOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelOwnerService],
    }).compile();

    service = module.get<HotelOwnerService>(HotelOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
