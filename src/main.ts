import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './common/config/env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port ?? 3000);
}
bootstrap();
