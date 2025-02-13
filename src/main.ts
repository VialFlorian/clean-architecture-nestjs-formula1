import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configureNestJsTypebox } from 'nestjs-typebox';
import { AppModule } from './infra/frameworks/nestjs/app.module';

configureNestJsTypebox({ patchSwagger: true });

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule.forRoot({ repository: 'prisma' }),
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Formula 1 API')
    .setDescription('A Formula 1 API following Clean Architecture principles, built with Nestjs and Prisma.')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory, {
    swaggerOptions: {
      authAction: {
        bearer: {
          name: 'bearer',
          schema: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
          value: 'b3ZJ24IUFuoGUP',
        },
      },
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
