import { Controller, Get, Res } from '@nestjs/common';

import { OtherzoneService } from 'src/provider/otherzone.service';

@Controller('otherzone')
export class OtherzoneController {
  constructor(private readonly otherzoneService: OtherzoneService) {}

  @Get('random')
  async gotoRandomUrl(@Res() res) {
    const randomUrl = await this.otherzoneService.getRandomUrl();
    
    res.redirect(randomUrl);
  }
  
  @Get('random-item')
  async getRandomItem(): Promise<string> {
    return await this.otherzoneService.getRandomItem();
  }
  
  @Get('random-url')
  async getRandomUrl(): Promise<string> {
    return await this.otherzoneService.getRandomUrl();
  }
}
