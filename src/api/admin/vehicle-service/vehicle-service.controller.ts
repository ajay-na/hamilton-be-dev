import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/api-response.decorator';
import { IdParamsDto } from 'src/common/dto/user-params.dto';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { CurrentuserDto } from '../../../auth/dto/current-user.dto';
import { Role } from '../../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { ServiceTicketDto } from './dto/get-veicle-service-details.dto';
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

  @ApiOperation({ summary: 'Get vehicle service status' })
  @ApiPaginatedResponse(ServiceTicketDto)
  @Get(':id')
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
}
