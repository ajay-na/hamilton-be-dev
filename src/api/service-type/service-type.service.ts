import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { WinstonLoggerService } from '../../logger/logger.service';
import { ServiceTypeDetailDto } from './dto/get-service-type-detail.dto';
import { getAllServiceDetailsQuery } from './query/get-all-service-types.query';

@Injectable()
export class ServiceTypeService {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: WinstonLoggerService,
  ) {
    if (typeof this.logger.setContext === 'function') {
      this.logger.setContext(ServiceTypeService.name);
    }
  }

  async getAllServiceDetails(): Promise<ServiceTypeDetailDto[]> {
    try {
      const data = await this.db.query<ServiceTypeDetailDto>(
        getAllServiceDetailsQuery,
        [],
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error fetching all service types: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }
}
