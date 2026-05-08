import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { WinstonLoggerService } from '../../logger/logger.service';
import { BookSlotResponseDto } from './dto/book-slot-response.dto';
import { SlotTimingDto } from './dto/get-all-slots.dto';
import { SlotBookingBodyDto } from './dto/slot-booking.dto';
import { getAllAvailableSlotsQuery } from './query/get-all-available-slots.query';
import { insertBookingSlotQuery } from './query/insert-booking-slot.query';

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

  async bookSlot(data: SlotBookingBodyDto, user: string): Promise<BookSlotResponseDto[]> {
    try {
      const result = await this.db.query(insertBookingSlotQuery, [
        data.booking_date,
        data.slot,
        data.description || null,
        user,
        data.vehicle,
        data.service_type
      ]);

      return result;
    } catch (error:unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error booking slot: ${error.message}`, error.stack);
      } else {
        this.logger.error('An unknown error occurred in bookSlot');
      }
      throw error;
    }
  }
}
