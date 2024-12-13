import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { RootController } from './controller/root.controller';
import { HomeDepotController } from './controller/home-depot.controller';
import { EtsyController } from './controller/etsy.controller';

import { RootService } from './provider/root.service';
import { HomeDepotService } from './provider/home-depot.service';
import { EtsyService } from './provider/etsy.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [RootController, HomeDepotController, EtsyController],
  providers: [RootService, HomeDepotService, EtsyService]
})
export class AppModule {}
