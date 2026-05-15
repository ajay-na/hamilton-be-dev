import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { AdminServiceTypeController } from './admin-service-type.controller';
import { ServiceTypeAdminService } from './admin-service-type.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminServiceTypeController],
  providers: [ServiceTypeAdminService],
})
export class ServiceTypeAdminModule {}
