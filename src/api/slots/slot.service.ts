import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { WinstonLoggerService } from '../../logger/logger.service';
import { SlotTimingDto } from './dto/get-all-slots.dto';
import { getAllAvailableSlotsQuery } from './query/get-all-available-slots.query';

@Injectable()
export class SlotService {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: WinstonLoggerService,
  ) {
    if (typeof this.logger.setContext === 'function') {
      this.logger.setContext(SlotService.name);
    }
  }
  async getAllAvailableSlots(date: string): Promise<SlotTimingDto[]> {
    try {
      const data = await this.db.query<SlotTimingDto>(
        getAllAvailableSlotsQuery,
        [date],
      );

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error: ${error.message}`, error.stack);
      } else {
        this.logger.error('An unknown error occurred in findById');
      }
      throw error;
    }
  }
}
