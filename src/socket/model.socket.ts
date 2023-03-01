export interface IUserSocket {
  idUser: string;
  sockets: Array<any>;
}

export interface IDataMessage {
  idChat: string;
  of: {
    idUnique: string;
    userName: string;
    picture: string;
  };
  to: string;
  message: string;
}
