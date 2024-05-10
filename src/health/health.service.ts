import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor() { }
  check(): string {
    return 'all good';
  }
}
