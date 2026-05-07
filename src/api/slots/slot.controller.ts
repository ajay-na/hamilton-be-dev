import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import { GetAllSlotQueryDto } from './dto/get-all-slots-query.dto';
import { SlotTimingDto } from './dto/get-all-slots.dto';
import { SlotService } from './slot.service';

@ApiTags('Slots')
@ApiBearerAuth('JWT-auth')
@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @ApiOperation({ summary: 'Get all available slots' })
  @ApiPaginatedResponse(SlotTimingDto, true)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllBrand(
    @Query() params: GetAllSlotQueryDto,
  ): Promise<SlotTimingDto[]> {
    return this.slotService.getAllAvailableSlots(params.date);
  }
}
