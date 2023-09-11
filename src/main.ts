import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    session({
      secret: 'itopia',
      resave: false,
      saveUninitialized: false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Itopia')
    .setDescription('The Itopia API ')
    .setVersion('1.0')
    .addTag('Itopia')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
