/* eslint-disable camelcase */
export interface LoginFormModel {
  email: string;
  password: string;
}
export interface User {
  avatar: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}
export interface Message {
  content: string;
  type: string;
  time: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
  user_id: number;
  id: number;
}
export interface MessagesItem {
  id: number;
  messages: Message[];
}
