import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-params.dto';
import { IdParamsDto } from '../../common/dto/user-params.dto';
import { GetVehicleByBrandSuccessDTO } from '../vehicle/dto/get-vehicle-by-brand-id.dto';
import { BrandService } from './brand.service';
import { BrandDetailResponseDto } from './dto/brand-details.dto';
import { GetAllBrandDto } from './dto/brand-list.dto';
import { SearchBrandByNameDto } from './dto/search-brand-by-name.dto';

@ApiTags('Brands')
@ApiBearerAuth('JWT-auth')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Get all brands' })
  @ApiPaginatedResponse(GetAllBrandDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Get()
  async getAllBrand(
    @Query() params: PaginationQueryDto,
  ): Promise<GetAllBrandDto> {
    return this.brandService.getAllBrands(params);
  }

  @ApiOperation({ summary: 'Get brand details by id' })
  @ApiPaginatedResponse(BrandDetailResponseDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Get('detail/:id')
  async getBrandDetailsById(
    @Param() param: IdParamsDto,
  ): Promise<BrandDetailResponseDto> {
    return this.brandService.getBrandDetailsById(param.id);
  }

  @ApiOperation({ summary: 'search brand by name' })
  @ApiPaginatedResponse(GetVehicleByBrandSuccessDTO, true)
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async serachBrandByName(
    @Query() params: SearchBrandByNameDto,
  ): Promise<GetVehicleByBrandSuccessDTO[]> {
    return this.brandService.searchBrandByName(params.name);
  }
}
