import { PrismaService } from "prisma.service";

import { Module } from "@nestjs/common";

import { CompaniesController } from "./companies.controller";
import { CompaniesService } from "./companies.service";

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService],
})
export class CompaniesModule {}
