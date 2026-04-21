import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-params.dto';
import { DatabaseService } from '../../database/database.service';
import { WinstonLoggerService } from '../../logger/logger.service';
import { GetVehicleByBrandSuccessDTO } from '../vehicle/dto/get-vehicle-by-brand-id.dto';
import {
  BrandDetailResponseDBDto,
  BrandDetailResponseDto,
} from './dto/brand-details.dto';
import { GetAllBrandDto } from './dto/brand-list.dto';
import { getAllBrandsQuery } from './query/get-all-brands.query';
import { getBrandDetailsByIdQuery } from './query/get-brand-details.query';
import { searchBrandByNameQuery } from './query/search-brand-by-name.query';

@Injectable()
export class BrandService {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: WinstonLoggerService,
  ) {
    if (typeof this.logger.setContext === 'function') {
      this.logger.setContext(BrandService.name);
    }
  }

  async getAllBrands(params: PaginationQueryDto): Promise<GetAllBrandDto> {
    try {
      const { offset, limit } = params;
      const data = await this.db.query<BrandDetailResponseDBDto>(
        getAllBrandsQuery,
        [limit, offset],
      );
      const totalItems =
        data.length > 0 ? parseInt(data[0].total_count, 10) : 0;
      return {
        brand: data.map(({ total_count, ...brand }) => brand),
        pagination: {
          total_items: totalItems,
          limit,
          offset,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`FindById Error: ${error.message}`, error.stack);
      } else {
        this.logger.error('An unknown error occurred in findById');
      }
      throw error;
    }
  }

  async getBrandDetailsById(id: string): Promise<BrandDetailResponseDto> {
    try {
      const [data] = await this.db.query<BrandDetailResponseDto>(
        getBrandDetailsByIdQuery,
        [id],
      );
      if (!data) {
        throw new NotFoundException('Brand not found');
      }

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

  async searchBrandByName(
    name: string,
  ): Promise<GetVehicleByBrandSuccessDTO[]> {
    try {
      const data = await this.db.query<GetVehicleByBrandSuccessDTO>(
        searchBrandByNameQuery(name),
        [],
      );
      if (!data) {
        throw new NotFoundException('Brand not found');
      }

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
}
