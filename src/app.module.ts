import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RootController } from './controller/root.controller';
import { HomeDepotController } from './controller/home-depot.controller';

import { RootService } from './provider/root.service';
import { HomeDepotService } from './provider/home-depot.service';

@Module({
  imports: [HttpModule],
  controllers: [RootController, HomeDepotController],
  providers: [RootService, HomeDepotService],
})
export class AppModule {}
