import { Global, Module } from '@nestjs/common';
import { WinstonLoggerService } from './logger.service';

@Global() // This makes the providers inside available globally
@Module({
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService], // You MUST export it so others can use it
})
export class LoggerModule {}
