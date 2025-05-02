import { Test, TestingModule } from '@nestjs/testing';
import { HotelOwnerController } from './hotel-owner.controller';
import { HotelOwnerService } from './hotel-owner.service';

describe('HotelOwnerController', () => {
  let controller: HotelOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelOwnerController],
      providers: [HotelOwnerService],
    }).compile();

    controller = module.get<HotelOwnerController>(HotelOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
