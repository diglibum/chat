import { HTTPTransport as HTTP } from "../../modules/HTTPtransport";
import { BaseAPI } from "../BaseApi";
import { AddUsersToChatRequest, BaseRequest } from "../types";

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
}
