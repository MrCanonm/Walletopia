import { Controller, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return { name: 'Canonm' };
  }
}
