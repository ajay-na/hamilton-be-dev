import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { CurrentuserDto } from '../../../auth/dto/current-user.dto';
import { Role } from '../../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { ApiPaginatedResponse } from '../../../common/decorators/api-response.decorator';
import { DateParamDto } from '../../../common/dto/date-param.dto';
import { IdParamsDto } from '../../../common/dto/user-params.dto';
import { AddCostReqBodyDto } from './dto/add-cost-for-service.dto';
import { UpcomingServiceResponseDto } from './dto/get-upcoming-service-details-respononse.dto';
import { ServiceTicketDto } from './dto/get-veicle-service-details.dto';
import { ServiceRecordResponseDto } from './dto/gte-live-vehicle-status.dto';
import { InitiateServiceReqBodyDto } from './dto/initiate-service-req-body.dto';
import { UpdateServiceStatusReqBodyDto } from './dto/update-service-status-req-body.dto';
import { VehicleServiceAdminService } from './vehicle-service.service';

@ApiTags('Admin/Vehicle-service')
@ApiBearerAuth('JWT-auth')
@Controller('admin/service')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class VehicleServiceAdminController {
  constructor(
    private readonly vehicleServiceAdminService: VehicleServiceAdminService,
  ) {}

  @Get('live')
  @ApiOperation({ summary: 'Get live service details' })
  @ApiPaginatedResponse(ServiceRecordResponseDto, true)
  async getLiveServiceDetails(): Promise<ServiceRecordResponseDto[]> {
    return this.vehicleServiceAdminService.getLiveServiceDetails();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming service details' })
  @ApiPaginatedResponse(UpcomingServiceResponseDto, true)
  async getUpcomingServiceDetails(
    @Query() param: DateParamDto,
  ): Promise<UpcomingServiceResponseDto[]> {
    return this.vehicleServiceAdminService.getUpcomingServiceDetails(
      param.date,
    );
  }

  @ApiOperation({ summary: 'Get vehicle service status' })
  @ApiPaginatedResponse(ServiceTicketDto)
  @Get('details/:id')
  async getVehicleServiceStatus(
    @Param() param: IdParamsDto,
  ): Promise<ServiceTicketDto> {
    return this.vehicleServiceAdminService.getVehicleServiceStatus(param.id);
  }

  @Post('initiate-service')
  @ApiOperation({ summary: 'Initiate service process for vehicle' })
  @ApiPaginatedResponse(IdParamsDto)
  async initiateService(
    @Body() body: InitiateServiceReqBodyDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<IdParamsDto> {
    return this.vehicleServiceAdminService.initiateService(body, user.id);
  }

  @Post('service-status')
  @ApiOperation({ summary: 'Update service status for vehicle' })
  @ApiPaginatedResponse(IdParamsDto)
  async updateVehicleServiceStatus(
    @Body() body: UpdateServiceStatusReqBodyDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<IdParamsDto> {
    return this.vehicleServiceAdminService.updateVehicleServiceStatus(
      body,
      user.id,
    );
  }

  @Post('add-cost')
  @ApiOperation({
    summary:
      'Add cost for vehicle service and insert into spare part and service history',
  })
  async addCost(
    @Body() body: AddCostReqBodyDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<any> {
    return this.vehicleServiceAdminService.addCostDetails(body, user.id);
  }
}
