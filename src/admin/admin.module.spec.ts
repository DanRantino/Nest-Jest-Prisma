import { Test } from '@nestjs/testing';
import { AdminModule } from './admin.module';

describe('MyController', () => {
  let myController: AdminModule;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile();

    myController = module.get<AdminModule>(AdminModule);
  });

  it('should be defined', () => {
    expect(myController).toBeDefined();
  });
});
