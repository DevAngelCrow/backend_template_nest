import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/infrastructure/http/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', {
    exclude: ['docs', 'api/docs', '/'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  //Swagger config
  const config = new DocumentBuilder()
    .setTitle('Backend template api')
    .setDescription('API Docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
        description: 'Ingrese el JWT',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'API Docs - Swagger UI',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  // SwaggerModule.setup('/', app, document);

  //Scalar Docs config
  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'bluePlanet',
      layout: 'modern',
      metaData: {
        title: 'Backend Template API - Scalar',
        description: 'Documentación interactiva de la API',
        favicon: 'https://docs.scalar.com/favicon.png',
      },
    }),
  );

  //Homepage redirect (opcional)
  SwaggerModule.setup('/', app, document);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api/docs`);
  console.log(`Scalar Docs: http://localhost:${port}/docs`);
  console.log(`Home (Swagger): http://localhost:${port}/`);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
