import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private healthService: HealthService
  ) { }

  // @Get()
  // @HealthCheck()
  // check() {
  //   return this.health.check([
  //     () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
  //   ]);
  // }

  @Get()
  check() {
    return this.healthService.check();
  }

}
