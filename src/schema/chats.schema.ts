import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TypesChat } from 'src/constants/typesChat';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  idUser: string;

  @Prop()
  chats: [
    {
      idChat: string;
      members: Array<string> | [];
      messages: Array<string> | [];
      typeChat: TypesChat;
    },
  ];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
