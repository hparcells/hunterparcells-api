import { Body, Controller, Get, Headers, Param, Post, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';

import { EtsyService } from 'src/provider/etsy.service';
import { ConfigService } from '@nestjs/config';

@Controller('etsy')
export class EtsyController {
  constructor(
    private configService: ConfigService,
    private readonly etsyService: EtsyService
  ) {}

  @Post('shorten-name')
  async shortenName(
    @Body()
    body: {
      name: string;
    },
    @Headers('X-Etsy-Key') key: Headers
  ) {
    if (!key) {
      return {
        error: 'Missing "X-Etsy-Key" header.'
      };
    }
    if (key !== this.configService.get('MASTER_ETSY_API_KEY')) {
      return {
        error: 'Invalid "X-Etsy-Key" header.'
      };
    }

    if (!body.name) {
      return {
        error: 'Missing "name" field in request body.'
      };
    }

    return this.etsyService.shortenName(body.name);
  }
}
