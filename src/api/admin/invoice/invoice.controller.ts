import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { CurrentuserDto } from '../../../auth/dto/current-user.dto';
import { ApiPaginatedResponse } from '../../../common/decorators/api-response.decorator';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { IdParamsDto } from '../../../common/dto/user-params.dto';
import { ServiceRecordResponseDto } from './dto/get-invoice-data.response.dto';
import { InvoiceService } from './invoice.service';

@ApiTags('Admin/Invoice')
@ApiBearerAuth('JWT-auth')
@Controller('admin/invoice')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('generate/:id')
  async generateInvoice(
    @Param() param: IdParamsDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<IdParamsDto> {
    return this.invoiceService.generateInvoice(param.id, user.id);
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=invoice.pdf')
  async downloadInvoice(@Param('id') id: string, @Res() res: any) {
    const pdfBuffer = await this.invoiceService.generateInvoicePdf(id);

    res.send(pdfBuffer);
  }

  @ApiOperation({ summary: 'get invoice data' })
  @ApiPaginatedResponse(ServiceRecordResponseDto, false)
  @Get(':id')
  async getInvoiceData(
    @Param() param: IdParamsDto,
  ): Promise<ServiceRecordResponseDto> {
    return this.invoiceService.getInvoiceData(param.id);
  }
}
