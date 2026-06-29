import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import path from 'node:path';
import { DatabaseService } from '../../database/database.service';
import { WinstonLoggerService } from '../../logger/logger.service';
import { ServiceRecordResponseDto } from './dto/get-invoice-data.response.dto';
import { generateInvoiceDataQuery } from './query/generate-data-for-invoice.query';
import { getInvoiceDataQuery } from './query/get-invoice-data.query';
@Injectable()
export class InvoiceService {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: WinstonLoggerService,
  ) {
    if (typeof this.logger.setContext === 'function') {
      this.logger.setContext(InvoiceService.name);
    }
  }

  async generateInvoicePdf(
    id: any,
  ): Promise<{ pdfBuffer: Buffer; filename: string }> {
    try {
      if (!handlebars.helpers['addOne']) {
        handlebars.registerHelper('addOne', (value: number) => {
          return value + 1;
        });
      }

      const [data] = await this.db.query(generateInvoiceDataQuery, [id]);
      const filename = this.generateFilename(data);
      const templatePath = path.resolve(
        process.cwd(),
        'src/templates/invoice.hbs',
      );
      const templateHtml = fs.readFileSync(templatePath, 'utf8');
      const compiledTemplate = handlebars.compile(templateHtml);
      const finalHtml = compiledTemplate(data);

      const puppeteer = await (eval('import("puppeteer")') as Promise<
        typeof import('puppeteer')
      >);
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      await page.setContent(finalHtml, { waitUntil: 'domcontentloaded' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          bottom: '20px',
          left: '20px',
          right: '20px',
        },
      });

      await browser.close();
      return {
        pdfBuffer: Buffer.from(pdfBuffer),
        filename,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'Error generating PDF invoice',
        errorMessage,
      );
    }
  }
  private generateFilename(data: any): string {
    const license_plate = data?.license_plate;
    const date = data.created_at.toISOString().split('T')[0]; // YYYY-MM-DD
    return `invoice-${license_plate}-${date}.pdf`;
  }

  async getInvoiceData(id: string): Promise<ServiceRecordResponseDto> {
    try {
      const [data] = await this.db.query<ServiceRecordResponseDto>(
        getInvoiceDataQuery,
        [id],
      );
      return data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'Error gettin invoice data',
        errorMessage,
      );
    }
  }
}
