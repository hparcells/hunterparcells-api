import { Controller, Get } from '@nestjs/common';

import { RootService } from '../provider/root.service';

@Controller()
export class RootController {
  constructor(private readonly appService: RootService) {}

  @Get()
  getHello(): string {
    console.log('j');
    return this.appService.getHello();
  }
}
