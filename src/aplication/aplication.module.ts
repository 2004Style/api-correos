import { Module } from '@nestjs/common';
import { AplicationController } from './aplication.controller';
import { AplicationService } from './aplication.service';

@Module({
  controllers: [AplicationController],
  providers: [AplicationService],
  exports: [AplicationService],
})
export class AplicationModule {}
