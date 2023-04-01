import { PrismaService } from "prisma.service";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PetsModule } from "./pets/pets.module";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from './categories/categories.module';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PetsModule,
    CategoriesModule,
    BreedsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
