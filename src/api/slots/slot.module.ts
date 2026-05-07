import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
@Module({
  imports: [DatabaseModule],
  controllers: [SlotController],
  providers: [SlotService],
})
export class SlotsModule {}
