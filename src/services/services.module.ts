import { PrismaService } from "prisma.service";

import { Module } from "@nestjs/common";

import { ServicesController } from "./services.controller";
import { ServicesService } from "./services.service";

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
})
export class ServicesModule {}
