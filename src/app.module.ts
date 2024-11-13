import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { RootController } from './controller/root.controller';
import { HomeDepotController } from './controller/home-depot.controller';
import { OtherzoneController } from './controller/otherzone.controller';

import { RootService } from './provider/root.service';
import { HomeDepotService } from './provider/home-depot.service';
import { OtherzoneService } from './provider/otherzone.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [RootController, HomeDepotController, OtherzoneController],
  providers: [RootService, HomeDepotService, OtherzoneService]
})
export class AppModule {}
