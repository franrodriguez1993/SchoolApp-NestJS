import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { Unit, UnitSchema } from './unit.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Unit.name,
        schema: UnitSchema,
      },
    ]),
    SharedModule,
  ],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
