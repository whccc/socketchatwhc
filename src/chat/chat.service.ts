import { Injectable } from '@nestjs/common';
import { domainCode, messageApi } from 'src/helper/domaincode';
import { ApiResponse } from 'src/responses/api.response';
import { ChatDocument } from 'src/schema/chats.schema';
import { ChatRepository } from './chat.repository';
import { IDataChatCreate } from './interfaces/IChat.interface';
import { IChatService } from './interfaces/IChatService.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(private chatRepository: ChatRepository) {}

  public async createChatOneToOne(dataChat: IDataChatCreate): Promise<void> {
    const chats = await this.chatRepository.getByUserChats(
      dataChat.idUserCreation,
    );
    if (!chats) {
      await this.chatRepository.createChat(dataChat);
    } else {
      await this.chatRepository.updateChat(dataChat);
    }
  }

  public async getChatsByIdUser(
    idUser: string,
  ): Promise<ApiResponse<ChatDocument>> {
    const dataUser = await this.chatRepository.getChatsByIdUser(idUser);
    return new ApiResponse(dataUser, domainCode.SUCCESS, messageApi.SUCCESS);
  }
}
