import { PrismaService } from "prisma.service";

import { Module } from "@nestjs/common";

import { BreedsController } from "./breeds.controller";
import { BreedsService } from "./breeds.service";

@Module({
  controllers: [BreedsController],
  providers: [BreedsService, PrismaService],
})
export class BreedsModule {}
