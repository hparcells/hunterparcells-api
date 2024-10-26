import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { HomeDepotService } from '../provider/home-depot.service';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('home-depot')
export class HomeDepotController {
  constructor(private readonly homeDepotService: HomeDepotService, private readonly httpService: HttpService) {}

  @Get('random-url')
  async getRandomUrl(): Promise<string> {
    let url;
    let status;

    do {
      const requests = Array.from({ length: 10 }, () => {
        return this.httpService.get(this.homeDepotService.getRandomUrl());
      }).map((request) => firstValueFrom(request));
      
      await Promise.any(requests).then((result) => {
        url = result.config.url;
        status = result.status;
        return result;
      }).catch((error) => error);
    }while(status !== 200);

    return url;
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
