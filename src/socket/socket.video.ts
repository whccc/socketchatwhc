import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets/decorators';
import { Socket } from 'socket.io/dist/socket';
import { IAnswerCall, ICallVideo } from 'src/chat/interfaces/IChat.interface';
import { socketGateway } from './socket.gateway';

export class socketVideoextends extends socketGateway {
  @SubscribeMessage('callUser')
  public onCallUser(@MessageBody() dataChat: ICallVideo) {
    const user = this.getAllSocketsByIdUser(dataChat.to);
    if (!user) {
      return;
    }
    for (const socket of user?.sockets) {
      console.log(dataChat);
      socket.emit('callUser', {
        signal: dataChat.signalData,
        from: dataChat.from,
        name: dataChat.userName,
      });
    }
  }

  @SubscribeMessage('answerCall')
  public onAnswerCall(@MessageBody() dataChat: IAnswerCall) {
    const user = this.getAllSocketsByIdUser(dataChat.to);
    if (!user) {
      return;
    }
    console.log(dataChat.signal);
    for (const socket of user?.sockets) {
      socket.emit('callAccepted', dataChat.signal);
    }
  }
}
