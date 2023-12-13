import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    //mongo
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
