import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { socketGateway } from './socket/socket.gateway';
import { socketVideoextends } from './socket/socket.video';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chatwhcnesjt'),
    ChatModule,
  ],
  controllers: [],
  providers: [socketGateway],
})
export class AppModule {}
