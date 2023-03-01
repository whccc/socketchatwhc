import { ApiResponse } from 'src/responses/api.response';
import { ChatDocument } from 'src/schema/chats.schema';
import { IDataChatCreate } from './IChat.interface';
export interface IChatService {
  createChatOneToOne(dataChat: IDataChatCreate): Promise<void>;
  getChatsByIdUser(idUser: string): Promise<ApiResponse<ChatDocument>>;
}
