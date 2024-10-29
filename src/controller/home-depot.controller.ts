import { Controller, Get, Param, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';

import { HomeDepotService } from '../provider/home-depot.service';

@Controller('home-depot')
export class HomeDepotController {
  constructor(private readonly homeDepotService: HomeDepotService, private readonly httpService: HttpService) {}

  @Get('random')
  async gotoRandom(@Res() res: Response) {
    const url = await this.homeDepotService.getRandomUrl();
    
    res.redirect(url);
  }
  
  @Get('random-url')
  async getRandomUrl(): Promise<string> {
    return await this.homeDepotService.getRandomUrl();
  }

  @Get('random-product')
  async getRandomProduct() {
    const url = await this.getRandomUrl();
    const id = url.split('/').pop();
    
    return this.homeDepotService.getProductInfo(id);
  }

  @Get('product/:id')
  async getProductInfo(@Param() params: { id: string }) {
    return this.homeDepotService.getProductInfo(params.id);
  }
}
