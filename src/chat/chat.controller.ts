import { Controller, Get, NotAcceptableException, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get('/:idUser')
  public getChatsByUser(@Param() params: { idUser: string }) {
    const { idUser } = params;
    if (idUser.trim() === '') {
      return new NotAcceptableException();
    }
    return this.chatService.getChatsByIdUser(idUser);
  }
}
