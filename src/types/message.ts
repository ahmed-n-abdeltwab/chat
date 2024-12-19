export interface Message {
  username: string;
  text: string;
  timestamp?: Date;
  _id?: string;
}

export interface MessageResponse {
  type: 'message' | 'history';
  message?: Message;
  messages?: Message[];
}
