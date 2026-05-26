import { Injectable, NotFoundException } from '@nestjs/common';
import { IdParamsDto } from 'src/common/dto/user-params.dto';
import { DatabaseService } from '../../database/database.service';
import { WinstonLoggerService } from '../../logger/logger.service';
import { CreateSpareDto } from './dto/create-spare.dto';
import { SpareResponseDto } from './dto/spare-response.dto';
import { UpdateSpareDto } from './dto/update-spare.dto';
import { createSpareQuery } from './query/create-spare.query';
import { deleteSpareQuery } from './query/delete-spare.query';
import { getAllSparesQuery } from './query/get-all-spares.query';
import { getSpareByIdQuery } from './query/get-spare-by-id.query';
import { updateSpareQuery } from './query/update-spare.query';

@Injectable()
export class SpareService {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: WinstonLoggerService,
  ) {
    if (typeof this.logger.setContext === 'function') {
      this.logger.setContext(SpareService.name);
    }
  }

  async createSpare(dto: CreateSpareDto, userId: string): Promise<IdParamsDto> {
    try {
      const [data] = await this.db.query<IdParamsDto>(createSpareQuery, [
        dto.name,
        dto.image_url || null,
        dto.price || null,
        dto.note || null,
        dto.m_brand_id,
        userId,
        userId,
      ]);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`createSpare Error: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async getAllSpares(): Promise<SpareResponseDto[]> {
    try {
      return await this.db.query<SpareResponseDto>(getAllSparesQuery, []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`getAllSpares Error: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async getSpareById(id: string): Promise<SpareResponseDto> {
    try {
      const [data] = await this.db.query<SpareResponseDto>(getSpareByIdQuery, [
        id,
      ]);
      if (!data) throw new NotFoundException('Spare not found');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`getSpareById Error: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async updateSpare(
    id: string,
    dto: UpdateSpareDto,
    userId: string,
  ): Promise<IdParamsDto> {
    try {
      const [data] = await this.db.query<IdParamsDto>(updateSpareQuery, [
        id,
        dto.name || null,
        dto.image_url || null,
        dto.price || null,
        dto.note || null,
        dto.m_brand_id || null,
        dto.is_active !== undefined ? dto.is_active : null,
        userId,
      ]);
      if (!data) throw new NotFoundException('Spare not found');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`updateSpare Error: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async deleteSpare(id: string, userId: string): Promise<IdParamsDto> {
    try {
      const [data] = await this.db.query<IdParamsDto>(deleteSpareQuery, [
        id,
        userId,
      ]);
      if (!data) throw new NotFoundException('Spare not found');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`deleteSpare Error: ${error.message}`, error.stack);
      }
      throw error;
    }
  }
}
