import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const morgan = require('morgan');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.use([
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :date[iso]',
    ),
  ]);
  await app.listen(3000);
}
bootstrap();
