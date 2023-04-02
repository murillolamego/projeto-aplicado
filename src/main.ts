import { PrismaService } from "prisma.service";

import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

declare const module: any;

export interface ExpressSwaggerCustomOptions {
  explorer?: boolean;
  swaggerOptions?: Record<string, any>;
  customCss?: string;
  customCssUrl?: string;
  customJs?: string;
  customfavIcon?: string;
  swaggerUrl?: string;
  customSiteTitle?: string;
  validatorUrl?: string;
  url?: string;
  urls?: Record<"url" | "name", string>[];
}

const customStyle = `
.swagger-ui .topbar { display: none } 
.swagger-ui .information-container{background-color: #7DDD00; max-width: 100%; padding: 40px 30px 20px} 
.swagger-ui .info {margin: 0} 
.swagger-ui .info .title{color: #101010}
.swagger-ui .info .renderedMarkdown p{color: #000000; font-weight: bold}
.swagger-ui .btn {box-shadow: none}
.swagger-ui .btn.authorize {background-color: #7DDD00; color: #101010; border-color: #7DDD00}
.swagger-ui .btn.authorize svg{fill: #101010}
.swagger-ui .authorization__btn svg{fill: #7DDD00}`;

const expressSwaggerCustomOptions: ExpressSwaggerCustomOptions = {
  swaggerOptions: {
    tagsSorter: "alpha",
  },
  customCss: customStyle,
  customSiteTitle: "Multiledgers API",
};

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Projeto aplicado")
    .setDescription(
      "Documentação da API do projeto aplicado, do curso de pós graduação em Desenvolvimento Full-Stack da XP Educação",
    )
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, expressSwaggerCustomOptions);

  const PORT = parseInt(configService.get<string>("PORT")) || 3333;

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
