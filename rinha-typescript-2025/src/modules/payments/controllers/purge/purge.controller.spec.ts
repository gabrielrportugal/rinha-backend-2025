import { Test, TestingModule } from '@nestjs/testing';
import { PurgeController } from './purge.controller';

describe('PurgeController', () => {
  let controller: PurgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurgeController],
    }).compile();

    controller = module.get<PurgeController>(PurgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
