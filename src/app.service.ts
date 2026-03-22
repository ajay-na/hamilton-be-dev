import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly db: DatabaseService) {}
  async getHello(): Promise<any> {
    const a = await this.db.query('select now()');
    console.log(a);
    return 'Hello World!';
  }
}
