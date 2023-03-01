import { ChatDocument } from 'src/schema/chats.schema';
import { IDataChatCreate } from './IChat.interface';

export interface IChatRepository {
  createChat(dataChat: IDataChatCreate): Promise<ChatDocument>;
  getByUserChats(idUser: string): Promise<ChatDocument>;
  updateChat(dataChat: IDataChatCreate): Promise<ChatDocument>;
  getChatsByIdUser(idUser: string): Promise<ChatDocument>;
}
