import { Controller, Get, Header, Query } from '@nestjs/common';

import { OtherzoneService } from '../provider/otherzone.service';

@Controller('otherzone')
export class OtherzoneController {
  constructor(private readonly otherzoneService: OtherzoneService) {}

  @Get('random')
  @Header('Content-Disposition', 'inline')
  async sendRandom(@Query('type') type) {
    if (type && !this.otherzoneService.isOtherzoneType(type)) {
      return 'Invalid type.';
    }

    const file = await this.otherzoneService.getRandomStreamableFile(type);

    return file;
  }

  @Get('stats')
  async getStats() {
    return await this.otherzoneService.getStats();
  }
}
