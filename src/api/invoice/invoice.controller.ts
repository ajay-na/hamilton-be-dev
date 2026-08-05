import { Controller, Get, Header, Param, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import { IdParamsDto } from '../../common/dto/user-params.dto';
import { ServiceRecordResponseDto } from './dto/get-invoice-data.response.dto';
import { InvoiceService } from './invoice.service';

@ApiTags('Invoice')
@ApiBearerAuth('JWT-auth')
@Controller('invoice')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':id/download')
  @Header('Content-Type', 'application/pdf')
  async downloadInvoice(@Param('id') id: string, @Res() res: any) {
    const { pdfBuffer, filename } =
      await this.invoiceService.generateInvoicePdf(id);

    // Set dynamic filename
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
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
