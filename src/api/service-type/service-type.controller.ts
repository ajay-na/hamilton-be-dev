import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import { ServiceTypeDetailDto } from './dto/get-service-type-detail.dto';
import { ServiceTypeService } from './service-type.service';

@ApiTags('Service-type')
@ApiBearerAuth('JWT-auth')
@Controller('service')
@UseGuards(JwtAuthGuard)
export class ServiceTypeController {
  constructor(private readonly serviceTypeService: ServiceTypeService) {}

  @ApiOperation({ summary: 'get all service details' })
  @ApiPaginatedResponse(ServiceTypeDetailDto, true)
  @Get()
  async getAllServiceDetails(): Promise<ServiceTypeDetailDto[]> {
    return this.serviceTypeService.getAllServiceDetails();
  }
}
