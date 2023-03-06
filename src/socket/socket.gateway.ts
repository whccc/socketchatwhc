import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { time } from 'console';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import {
  IAnswerCall,
  ICallVideo,
  IChatWriting,
  IDataChatCreate,
} from 'src/chat/interfaces/IChat.interface';
import { IDataMessage, IUserSocket } from './model.socket';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class socketGateway {
  public arraySesionUsers: Array<IUserSocket>;

  constructor(private chatService: ChatService) {
    this.arraySesionUsers = [];
  }
  @WebSocketServer() server: Socket;

  @SubscribeMessage('messageChat')
  public handleMessage(
    @MessageBody() dataMessage: IDataMessage,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('Enviaron mensaje', dataMessage);
    const user = this.getAllSocketsByIdUser(dataMessage.to);
    console.log('user socket', user);
    if (!user) {
      return;
    }
    for (const socket of user.sockets) {
      socket.emit('listeningToMessages', dataMessage);
    }
  }

  @SubscribeMessage('createChat')
  public handleCreateChat(@MessageBody() dataChat: IDataChatCreate): void {
    this.chatService.createChatOneToOne(dataChat);
  }

  @SubscribeMessage('writingChat')
  public handleWriting(@MessageBody() dataChat: IChatWriting): void {
    const user = this.getAllSocketsByIdUser(dataChat.to);
    if (!user) {
      return;
    }
    console.log(user);
    for (const socket of user?.sockets) {
      socket.emit('sendWritingChat', dataChat);
    }
  }

  @SubscribeMessage('notWritingChat')
  public handleNotWritingChat(@MessageBody() dataChat: IChatWriting): void {
    const user = this.getAllSocketsByIdUser(dataChat.to);
    if (!user) {
      return;
    }
    console.log('not w', dataChat);
    for (const socket of user?.sockets) {
      socket.emit('sendNotWritingChat', dataChat);
    }
  }

  public handleConnection(client: Socket) {
    this.addUserConnect(client);
  }

  public handleDisconnect(client: Socket) {
    this.removeUserConnect(client);
  }

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

  @SubscribeMessage('endCall')
  public enCall(@MessageBody() idUser: string): void {
    const user = this.getAllSocketsByIdUser(idUser);
    console.log('user socket', user);
    if (!user) {
      return;
    }
    for (const socket of user.sockets) {
      socket.emit('endCall', 'Usuario finalizó llamada');
    }
    console.log(idUser, 'finalizo llamda');
  }

  public addUserConnect(socket: Socket): void {
    const { idUser } = socket.handshake.query as { idUser: string };
    const userFound = this.arraySesionUsers.find((u) => u.idUser === idUser);
    if (!userFound) {
      this.arraySesionUsers.push({
        idUser,
        sockets: [socket],
      });
    } else {
      userFound.sockets.push(socket);
    }
    console.log(this.arraySesionUsers);
  }

  public removeUserConnect(socket: Socket): void {
    const { idUser } = socket.handshake.query as { idUser: string };
    const userFound = this.arraySesionUsers.find((u) => u.idUser === idUser);
    if (userFound) {
      userFound.sockets = userFound.sockets.filter((u) => u.id !== socket.id);
    }
    if (!userFound.sockets.length) {
      this.arraySesionUsers = this.arraySesionUsers.filter(
        (d) => d.idUser !== userFound.idUser,
      );
    }

    console.log(this.arraySesionUsers, 'me fui');
  }

  public getAllSocketsByIdUser(idUser: string): IUserSocket | null {
    return this.arraySesionUsers.find((u) => u.idUser === idUser);
  }
}
