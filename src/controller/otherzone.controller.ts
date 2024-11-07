import { Controller, Get, Header, Query, Res, StreamableFile } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { OtherzoneService } from '../provider/otherzone.service';
import { Response } from 'express';

@Controller('otherzone')
export class OtherzoneController {
  constructor(private readonly otherzoneService: OtherzoneService) {}

  @Get('random')
  @Header('Content-Disposition', 'inline')
  async sendRandom(@Query('type') type, @Res({ passthrough: true }) res: Response) {
    if(type && !this.otherzoneService.isOtherzoneType(type)) {
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
