import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constans';
import { UploadsController } from './uploads.controller';
import { UploadsModuleOptions } from './uploads.interfaces';

@Module({
  controllers: [UploadsController]
})
export class UploadsModule {
  static forRoot(options: UploadsModuleOptions): DynamicModule {
    return {
      module: UploadsModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options
        }
      ]
    }
  }
}
