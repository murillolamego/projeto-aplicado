import { join } from "path";
import { PrismaService } from "prisma.service";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AuthModule } from "./auth/auth.module";
import { BreedsModule } from "./breeds/breeds.module";
import { CategoriesModule } from "./categories/categories.module";
import { CompaniesModule } from "./companies/companies.module";
import { PetsModule } from "./pets/pets.module";
import { ProductsModule } from "./products/products.module";
import { ServicesModule } from "./services/services.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "../public"),
      serveRoot: "/public/",
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
