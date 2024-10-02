import { Module } from '@nestjs/common';
import { ServiceModule } from './modules/service.module';

@Module({
  imports: [ServiceModule],
})
export class AppModule {}
