import { TypesChat } from 'src/constants/typesChat';

export interface IDataChatCreate {
  idUserCreation: string;
  chat: IChat;
}

export interface IChatWriting {
  to: string;
  idChat: string;
  writing: boolean;
}

export interface IChat {
  idChat: string;
  members: [] | Array<string>;
  messages: Array<string> | [];
  typeChat: TypesChat;
}

export interface ICallVideo {
  signalData: any;
  from: string;
  userName: string;
  to: string;
}

export interface IAnswerCall {
  signal: any;
  to: string;
}
