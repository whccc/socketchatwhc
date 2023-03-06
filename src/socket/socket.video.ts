import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets/decorators';
import { Socket } from 'socket.io/dist/socket';
import { IAnswerCall, ICallVideo } from 'src/chat/interfaces/IChat.interface';
import { socketGateway } from './socket.gateway';

@WebSocketGateway()
export class socketVideoextends extends socketGateway {
  @SubscribeMessage('callUser')
  public onCallUser(@MessageBody() dataChat: ICallVideo) {
    console.log('llamandooo');
    const user = this.getAllSocketsByIdUser(dataChat.to);
    if (!user) {
      return;
    }
    for (const socket of user?.sockets) {
      socket.emit('callUser', {
        signal: dataChat.signalData,
        from: dataChat.from,
        name: dataChat.userName,
      });
    }
  }

  @SubscribeMessage('answerCall')
  public onAnswerCall(@MessageBody() dataChat: IAnswerCall) {
    console.log('lll');
    const user = this.getAllSocketsByIdUser(dataChat.to);
    if (!user) {
      return;
    }
    for (const socket of user?.sockets) {
      socket.emit('callAccepted', dataChat.signal);
    }
  }
}
