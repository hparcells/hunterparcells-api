import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { randomOf } from '../util/array';

@Injectable()
export class OtherzoneService {
  constructor(private configService: ConfigService, private readonly httpService: HttpService) {}
  
  async getRandomItem(): Promise<string> {
    const listUrl = this.configService.get('OTHERZONE_LIST_URL');
    const data = this.httpService.get(listUrl, {
      validateStatus: (status) => true
    });
    const response = await firstValueFrom(data);
    const content = response.data;

    const items = content.split('\r\n');

    return randomOf(items);
  }
  
  async getRandomUrl(): Promise<string> {
    const item = await this.getRandomItem();

    return `https://otherzone.net/${item}`;
  }
}
