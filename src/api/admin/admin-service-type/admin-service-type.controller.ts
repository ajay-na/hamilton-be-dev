import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { ApiPaginatedResponse } from '../../../common/decorators/api-response.decorator';
import { ServiceTypeAdminService } from './admin-service-type.service';
import { ServiceTypeDetailDto } from './dto/get-service-type-detail.dto';

@ApiTags('Admin/Service-type')
@ApiBearerAuth('JWT-auth')
@Controller('admin/service')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class AdminServiceTypeController {
  constructor(
    private readonly serviceTypeAdminService: ServiceTypeAdminService,
  ) {}

  @ApiOperation({ summary: 'get all service details' })
  @ApiPaginatedResponse(ServiceTypeDetailDto, true)
  @Get()
  async getAllServiceDetails(): Promise<ServiceTypeDetailDto[]> {
    return this.serviceTypeAdminService.getAllServiceDetails();
  }
}
