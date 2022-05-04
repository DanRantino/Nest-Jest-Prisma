import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';

describe('MyController', () => {
  let myController: AuthModule;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    myController = module.get<AuthModule>(AuthModule);
  });

  it('should be defined', () => {
    expect(myController).toBeDefined();
  });
});
