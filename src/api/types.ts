/* eslint-disable camelcase */
export interface BaseRequest {
    [key: string]: any
  }
export interface SignUpRequest extends BaseRequest {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
  }
export interface SignInRequest extends BaseRequest {
    login: string,
    password: string
  }
export interface UserProfileRequest extends BaseRequest {
    first_name: "string",
    second_name: "string",
    display_name: "string",
    login: "string",
    email: "string",
    phone: "string"
  }
export interface UserPasswordRequest extends BaseRequest {
    oldPassword: "string",
    newPassword: "string"
  }
export interface FindUserRequest extends BaseRequest{
  login: string
}
export interface DeleteChatRequest extends BaseRequest{
    chatId: number
}
export interface UsersInChat extends BaseRequest {
  users: number[],
  chatId: number
}

export interface AddUsersToChatRequest extends UsersInChat {}

export interface DeleteUsersFromChatRequest extends UsersInChat{}
