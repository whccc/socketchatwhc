import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from 'src/schema/chats.schema';
import { IDataChatCreate } from './interfaces/IChat.interface';
import { IChatRepository } from './interfaces/IChatRepository.interface';

@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  public async getByUserChats(idUser: string): Promise<ChatDocument> {
    return this.chatModel.findOne({ idUser });
  }

  public async createChat(
    dataCreateChat: IDataChatCreate,
  ): Promise<ChatDocument> {
    const { idUserCreation, chat } = dataCreateChat;
    const chatModel = new this.chatModel({
      idUser: idUserCreation,
      chats: [chat],
    });
    return chatModel.save();
  }

  public async updateChat(dataChat: IDataChatCreate): Promise<ChatDocument> {
    const { idUserCreation, chat } = dataChat;
    const user = await this.chatModel.findOne({ idUser: idUserCreation });
    user.chats.push(chat);
    return user.save();
  }

  public async getChatsByIdUser(idUser: string): Promise<ChatDocument> {
    return this.chatModel.findOne({ idUser });
  }
}
