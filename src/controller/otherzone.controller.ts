import { HttpService } from '@nestjs/axios';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

import { OtherzoneService } from '../provider/otherzone.service';

@Controller('otherzone')
export class OtherzoneController {
  constructor(private readonly httpService: HttpService, private readonly otherzoneService: OtherzoneService) {}

  @Get('random')
  async sendRandom(@Req() req, @Res() res: Response) {
    const randomUrl = await this.otherzoneService.getRandomUrl();
    const request = this.httpService.get(randomUrl, { responseType: 'stream' });
    const response = await firstValueFrom(request);

    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Cache-Control', 'no-cache');

    console.log('Sending from', randomUrl);
    
    response.data.pipe(res);
  }
  
  // @Get('random-item')
  // async getRandomItem(): Promise<string> {
  //   return await this.otherzoneService.getRandomItem();
  // }
  
  // @Get('random-url')
  // async getRandomUrl(): Promise<string> {
  //   return await this.otherzoneService.getRandomUrl();
  // }
}
