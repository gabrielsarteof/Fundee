import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NftModule } from './nft/nft.module';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, NftModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}