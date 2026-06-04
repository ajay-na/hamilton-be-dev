import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import path from 'node:path';
import { IdParamsDto } from 'src/common/dto/user-params.dto';
import { DatabaseService } from '../../../database/database.service';
import { WinstonLoggerService } from '../../../logger/logger.service';
import { ServiceRecordResponseDto } from './dto/get-invoice-data.response.dto';
import { generateInvoiceDataQuery } from './query/generate-data-for-invoice.query';
import { getInvoiceDataQuery } from './query/get-invoice-data.query';
import { generateInvoiceAndUpdateAbcQuery } from './query/insert-data-denormalised-table.query';
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

  async generateInvoice(id: string, userId: string): Promise<IdParamsDto> {
    try {
      const [data] = await this.db.query<IdParamsDto>(
        generateInvoiceAndUpdateAbcQuery,
        [id, userId],
      );
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Generating invoice Error: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error('An unknown error occurred in generating invoice');
      }
      throw error;
    }
  }

  async generateInvoicePdf(id: any): Promise<Buffer> {
    try {
      if (!handlebars.helpers['addOne']) {
        handlebars.registerHelper('addOne', (value: number) => {
          return value + 1;
        });
      }
      const [data] = await this.db.query(generateInvoiceDataQuery, [id]);
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
      return Buffer.from(pdfBuffer);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'Error generating PDF invoice',
        errorMessage,
      );
    }
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
