import { PrismaService } from "prisma.service";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { BreedsModule } from "./breeds/breeds.module";
import { CategoriesModule } from "./categories/categories.module";
import { PetsModule } from "./pets/pets.module";
import { UsersModule } from "./users/users.module";
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    UsersModule,
    PetsModule,
    CategoriesModule,
    BreedsModule,
    AuthModule,
    CompaniesModule,
    ProductsModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
