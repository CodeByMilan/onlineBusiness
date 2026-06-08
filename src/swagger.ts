import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminRouterModule } from './router/routes/admin.router.module';
import { UserRouterModule } from './router/routes/user.router.module';

export default async function SwaggerInit(app: NestExpressApplication) {
  const configService = app.get(ConfigService);

  // for admin
  const adminDocumentBuild = new DocumentBuilder()
    .setTitle('Lish Admin Api')
    .setDescription('Rest APIs for lish admin')
    .setVersion('1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .build();

  const adminDocument = SwaggerModule.createDocument(app, adminDocumentBuild, {
    deepScanRoutes: true,
    include: [AdminRouterModule],
  });

  SwaggerModule.setup('/admin-docs', app, adminDocument, {
    explorer: true,
    customSiteTitle: 'Lish Admin',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
    },
  });
  // for user
  const userDocumentBuild = new DocumentBuilder()
    .setTitle('Lish User API')
    .setDescription('APIs for lish User')
    .setVersion('1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .build();

  const userDocument = SwaggerModule.createDocument(app, userDocumentBuild, {
    deepScanRoutes: true,
    include: [UserRouterModule],
  });

  SwaggerModule.setup('/user-docs', app, userDocument, {
    explorer: true,
    customSiteTitle: 'Lish Customer',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
    },
  });
}
