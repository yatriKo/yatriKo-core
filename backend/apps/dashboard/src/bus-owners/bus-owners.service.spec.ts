import { Test, TestingModule } from '@nestjs/testing';
import { BusOwnersService } from './bus-owners.service';

describe('BusOwnersService', () => {
  let service: BusOwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusOwnersService],
    }).compile();

    service = module.get<BusOwnersService>(BusOwnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
