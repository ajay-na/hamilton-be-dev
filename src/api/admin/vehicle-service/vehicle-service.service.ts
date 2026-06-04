import { BadRequestException, Injectable } from '@nestjs/common';
import { IdParamsDto } from 'src/common/dto/user-params.dto';
import { DatabaseService } from '../../../database/database.service';
import { WinstonLoggerService } from '../../../logger/logger.service';
import { AddCostReqBodyDto } from './dto/add-cost-for-service.dto';
import { GetCompletedServiceQueryDto } from './dto/get-completed-service-param.dto';
import { UpcomingServiceResponseDto } from './dto/get-upcoming-service-details-respononse.dto';
import { ServiceRecordDetailResponseDto } from './dto/get-veicle-service-details.dto';
import { ServiceRecordResponseDto } from './dto/gte-live-vehicle-status.dto';
import { InitiateServiceReqBodyDto } from './dto/initiate-service-req-body.dto';
import { UpdateCostReqBodyDto } from './dto/update-cost-for-service.dto';
import { UpdateServiceStatusReqBodyDto } from './dto/update-service-status-req-body.dto';
import {
  addServiceCompletedQuery,
  addServiceHistoryQuery,
} from './query/change-service-status.query';
import { getCompletedServiceDetailsQuery } from './query/get-completed-services.query';
import { getDeleteInvoiceItemDetailsQuery } from './query/get-delete-item-cost.query';
import { getLiveServiceDetailsQuery } from './query/get-live-service-details.query';
import { getServiceDetailsQuery } from './query/get-service-details.query';
import { getUpcomingServiceDetailsQuery } from './query/get-upcoming-service-details.query';
import { insertServiceDetailsInitialQuery } from './query/insert-service-details.query';
import { getCostUpdateQuery } from './query/update-cost-details.query';

@Injectable()
export class VehicleServiceAdminService {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: WinstonLoggerService,
  ) {
    if (typeof this.logger.setContext === 'function') {
      this.logger.setContext(VehicleServiceAdminService.name);
    }
  }

  async getVehicleServiceStatus(
    id: string,
  ): Promise<ServiceRecordDetailResponseDto> {
    try {
      const [data] = await this.db.query<ServiceRecordDetailResponseDto>(
        getServiceDetailsQuery,
        [id],
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error fetching service details: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async initiateService(
    body: InitiateServiceReqBodyDto,
    currentUser: string,
  ): Promise<IdParamsDto> {
    try {
      const [data] = await this.db.query<IdParamsDto>(
        insertServiceDetailsInitialQuery,
        [
          body.vehicle,
          body.user,
          body.slot,
          body.advisor,
          body.technician,
          body.odo_reading,
          body.note,
          currentUser,
          body.remarks,
          body.service_in_time,
        ],
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error initiating service: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async updateVehicleServiceStatus(
    body: UpdateServiceStatusReqBodyDto,
    currentUser: string,
  ): Promise<IdParamsDto> {
    try {
      let query =
        body?.status === 'WORK_COMPLETED'
          ? addServiceCompletedQuery
          : addServiceHistoryQuery;

      const [data] = await this.db.query<IdParamsDto>(query, [
        body.service_record_id,
        body.status,
        body.remarks,
        currentUser,
      ]);
      if (!data?.id) {
        throw new BadRequestException(
          'Service history not updated as data is already inserted',
        );
      }
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error updating service: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async getLiveServiceDetails(): Promise<ServiceRecordResponseDto[]> {
    try {
      const data = await this.db.query<ServiceRecordResponseDto>(
        getLiveServiceDetailsQuery,
        [],
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error fetching live service details: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async getUpcomingServiceDetails(
    date: string,
  ): Promise<UpcomingServiceResponseDto[]> {
    try {
      const data = await this.db.query<UpcomingServiceResponseDto>(
        getUpcomingServiceDetailsQuery,
        [date],
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error fetching upcoming service details: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async getCompletedServiceDetails(
    param: GetCompletedServiceQueryDto,
  ): Promise<ServiceRecordResponseDto[]> {
    try {
      const query = getCompletedServiceDetailsQuery(param.isInvoiceGenerated);
      const data = await this.db.query<ServiceRecordResponseDto>(
        getCompletedServiceDetailsQuery(param.isInvoiceGenerated),
        [param.date],
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error fetching completed service details: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async addCostDetails(body: AddCostReqBodyDto, currentUser: string) {
    try {
      const items = Array.isArray(body.items) ? body.items : [body.items];

      const values: string[] = [];
      const params: any[] = [];
      let idx = 1;

      for (const item of items) {
        if (!item) continue;

        values.push(
          `($${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++})`,
        );
        params.push(
          body.service_record_id,
          item.spare_part_id || null,
          item.item_name,
          item.type,
          item.quantity || 1,
          item.unit_price,
          item.total_price,
          item.note || null,
          currentUser,
          currentUser,
        );
      }

      if (values.length === 0) return [];

      const query = `
        INSERT INTO t_service_item (
          service_record_id, 
          spare_part_id, 
          item_name, 
          type, 
          quantity, 
          unit_price, 
          total_price, 
          note, 
          created_by, 
          updated_by
        ) VALUES ${values.join(', ')}
        RETURNING id;
      `;

      const rows = await this.db.query(query, params);
      return rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error adding cost details: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async updateCostDetails(
    itemId: string,
    body: UpdateCostReqBodyDto,
    currentUser: string,
  ): Promise<IdParamsDto> {
    try {
      const { query, values } = getCostUpdateQuery(body, currentUser, itemId);
      const [rows] = await this.db.query(query, values);
      return rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error updating cost details: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async deleteCostDetails(itemId: string): Promise<IdParamsDto> {
    try {
      const [rows] = await this.db.query(getDeleteInvoiceItemDetailsQuery, [
        itemId,
      ]);
      return rows;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error deleting cost details: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }
}
