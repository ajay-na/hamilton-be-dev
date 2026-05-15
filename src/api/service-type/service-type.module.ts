import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ServiceTypeController } from './service-type.controller';
import { ServiceTypeService } from './service-type.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceTypeController],
  providers: [ServiceTypeService],
})
export class ServiceTypeModule {}
