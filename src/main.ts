import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import SwaggerInit from './swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await SwaggerInit(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
