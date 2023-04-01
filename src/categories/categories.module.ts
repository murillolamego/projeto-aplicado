import { PrismaService } from "prisma.service";

import { Module } from "@nestjs/common";

import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
})
export class CategoriesModule {}
