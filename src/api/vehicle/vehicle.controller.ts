import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import {
  BrandIdDto,
  GetVehicleByBrandSuccessDTO,
} from './dto/get-vehicle-by-brand-id.dto';
import { SearchVehicleReqParamDto } from './dto/search-vehicle-by-brand-and-name.dto';
import { VehicleService } from './vehicle.service';

@ApiTags('Vehicle')
@ApiBearerAuth('JWT-auth')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({
    summary: 'Get all vehicles by brand id(for vehicle dropdown',
  })
  @ApiPaginatedResponse(GetVehicleByBrandSuccessDTO, true)
  @Get('list')
  async getAllVehiclesByBrandId(
    @Query() params: BrandIdDto,
  ): Promise<GetVehicleByBrandSuccessDTO[]> {
    return this.vehicleService.getAllVehiclesByBrandId(params);
  }

  @ApiOperation({ summary: 'search vehicle by brand and model name' })
  @ApiPaginatedResponse(GetVehicleByBrandSuccessDTO, true)
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searcHVehicleByName(
    @Query() params: SearchVehicleReqParamDto,
  ): Promise<GetVehicleByBrandSuccessDTO[]> {
    return this.vehicleService.getVehicleByBrandAndName(params);
  }
}
