import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SpareController } from './spare.controller';
import { SpareService } from './spare.service';
@Module({
  imports: [DatabaseModule],
  controllers: [SpareController],
  providers: [SpareService],
})
export class SpareModule {}
