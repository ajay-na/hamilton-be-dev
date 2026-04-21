import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { WinstonLoggerService } from '../../logger/logger.service';
import {
  BrandIdDto,
  GetVehicleByBrandSuccessDTO,
} from './dto/get-vehicle-by-brand-id.dto';
import { SearchVehicleReqParamDto } from './dto/search-vehicle-by-brand-and-name.dto';
import { getAllVehicleByBrandIdQuery } from './query/get-all-vehicle-by-brand-id.query';
import { searchVehiclesByNameAndBrandQuery } from './query/search-vehicle-by-name.query';

@Injectable()
export class VehicleService {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: WinstonLoggerService,
  ) {
    if (typeof this.logger.setContext === 'function') {
      this.logger.setContext(VehicleService.name);
    }
  }

  async getAllVehiclesByBrandId(
    params: BrandIdDto,
  ): Promise<GetVehicleByBrandSuccessDTO[]> {
    try {
      const data = await this.db.query<GetVehicleByBrandSuccessDTO>(
        getAllVehicleByBrandIdQuery,
        [params.brandId],
      );

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`FindById Error: ${error.message}`, error.stack);
      } else {
        this.logger.error('An unknown error occurred in findById');
      }
      throw error;
    }
  }

  async getVehicleByBrandAndName(
    params: SearchVehicleReqParamDto,
  ): Promise<GetVehicleByBrandSuccessDTO[]> {
    try {
      const { brandId, name } = params;
      const data = await this.db.query<GetVehicleByBrandSuccessDTO>(
        searchVehiclesByNameAndBrandQuery(name, brandId),
        [],
      );
      if (!data) {
        throw new NotFoundException('vehicle not found');
      }

      return data || [];
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`FindById Error: ${error.message}`, error.stack);
      } else {
        this.logger.error('An unknown error occurred in findById');
      }
      throw error;
    }
  }
}
