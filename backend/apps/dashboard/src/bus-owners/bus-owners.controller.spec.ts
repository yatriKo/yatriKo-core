import { Test, TestingModule } from '@nestjs/testing';
import { BusOwnersController } from './bus-owners.controller';
import { BusOwnersService } from './bus-owners.service';

describe('BusOwnersController', () => {
  let controller: BusOwnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusOwnersController],
      providers: [BusOwnersService],
    }).compile();

    controller = module.get<BusOwnersController>(BusOwnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
