import { HTTPTransport as HTTP } from "../HTTPtransport";
import { BaseAPI } from "../baseApi";
import { AddUsersToChatRequest, BaseRequest, DeleteChatRequest, DeleteUsersFromChatRequest } from "../types";

const APIinstance = new HTTP("https://ya-praktikum.tech/api/v2/chats");
export class ChatApi extends BaseAPI {
  public create (chatName: BaseRequest) {
    return APIinstance.post(
      APIinstance.url,
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(chatName)
      });
  }

  getChats () {
    return APIinstance.get(APIinstance.url);
  }

  addUsersToChat (data: AddUsersToChatRequest) {
    return APIinstance.put(
      APIinstance.url + "/users",
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(data)
      });
  }

  getChatUsers (chatId: number) {
    return APIinstance.get(
      APIinstance.url + "/" + chatId + "/users",
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        }
      }
    );
  }

  deleteUsersFromChat (data: DeleteUsersFromChatRequest) {
    return APIinstance.delete(
      APIinstance.url + "/users",
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(data)
      });
  }

  deleteChat (data: DeleteChatRequest) {
    return APIinstance.delete(
      APIinstance.url,
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(data)
      });
  }
}
