import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  describe("health check", () => {
    it('should be defined', () => {
      expect(service.check).toBeDefined();
    });

    it('should respond to get request', () => {
      expect(service.check).toBeTruthy();
    })
  })
});
