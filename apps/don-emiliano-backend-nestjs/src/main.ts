import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './modules/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const PORT = process.env.PORT ?? 3000

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  app.setGlobalPrefix('/api/v1')

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Don Emiliano Backend')
    .setDescription('API Documentation for Don Emiliano Backend')
    .setVersion('1.0')
    .build()

  const document = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/v1/docs', app, document())

  await app.listen(PORT)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
/* eslint-disable @typescript-eslint/no-floating-promises */
bootstrap()
