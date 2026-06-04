import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { IdParamsDto } from '../../../common/dto/user-params.dto';
import { InvoiceService } from './invoice.service';

@ApiTags('Admin/Invoice')
@ApiBearerAuth('JWT-auth')
@Controller('admin/invoice')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
  @Post(':id')
  async generateInvoice(@Param() param: IdParamsDto) {
    return this.invoiceService.generateInvoice(param.id);
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=invoice.pdf')
  async downloadInvoice(@Param('id') id: string, @Res() res: any) {
    const pdfBuffer = await this.invoiceService.generateInvoicePdf(id);

    res.send(pdfBuffer);
  }

  @Post('generate-invoice')
  async generateInvoiceData() {}
}
