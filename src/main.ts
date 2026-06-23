import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import SwaggerInit from './swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await SwaggerInit(app);
  const configService = app.get(ConfigService);
  const port: number = configService.get('APP_PORT', 300);
  const host: string = configService.get('APP_HOST', 'localhost');
  await app.listen(port, host);

  const baseApi = `http://${host}:${port}`;

  console.log(`App running on ${baseApi}`);
  console.log(`Docs : ${baseApi}/admin-docs`);
}
bootstrap();
