import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { CurrentuserDto } from '../../auth/dto/current-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import { IdParamsDto } from '../../common/dto/user-params.dto';
import { CreateSpareDto } from './dto/create-spare.dto';
import { SpareResponseDto } from './dto/spare-response.dto';
import { UpdateSpareDto } from './dto/update-spare.dto';
import { SpareService } from './spare.service';

@ApiTags('Spare')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('spare')
export class SpareController {
  constructor(private readonly spareService: SpareService) {}

  @Post()
  @ApiOperation({ summary: 'Create new spare' })
  @ApiPaginatedResponse(IdParamsDto)
  async createSpare(
    @Body() body: CreateSpareDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<IdParamsDto> {
    return this.spareService.createSpare(body, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all spares' })
  @ApiPaginatedResponse(SpareResponseDto, true)
  async getAllSpares(): Promise<SpareResponseDto[]> {
    return this.spareService.getAllSpares();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get spare by id' })
  @ApiPaginatedResponse(SpareResponseDto)
  async getSpareById(@Param() param: IdParamsDto): Promise<SpareResponseDto> {
    return this.spareService.getSpareById(param.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update spare' })
  @ApiPaginatedResponse(IdParamsDto)
  async updateSpare(
    @Param() param: IdParamsDto,
    @Body() body: UpdateSpareDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<IdParamsDto> {
    return this.spareService.updateSpare(param.id, body, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete spare (soft delete)' })
  @ApiPaginatedResponse(IdParamsDto)
  async deleteSpare(
    @Param() param: IdParamsDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<IdParamsDto> {
    return this.spareService.deleteSpare(param.id, user.id);
  }
}
