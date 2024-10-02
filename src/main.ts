import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Generate Voucher')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.info('Listening on ' + (await app.getUrl()));
}
bootstrap();
