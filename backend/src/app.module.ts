import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';          
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { NftModule } from './nft/nft.module';
import { PrismaModule } from '../prisma/prisma.module';   
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: ['.env.development.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    NftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
