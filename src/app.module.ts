import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoClientModule } from './database/mongo-cliente.module';
import { UserModule } from '@modules/user/user.module';
import { CoursesModule } from '@modules/courses/courses.module';
import { UnitModule } from './app/modules/unit/unit.module';
import { LessonModule } from './app/modules/lesson/lesson.module';

import * as cors from 'cors';
import * as helmet from 'helmet';
import morganConfig from '@configs/morgan.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoClientModule,
    UserModule,
    CoursesModule,
    UnitModule,
    LessonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors({ origin: '*' }), helmet(), morganConfig)
      .forRoutes('*');
  }
}
