import { HTTPTransport as HTTP } from "../../modules/HTTPtransport";
import { BaseAPI } from "../BaseApi";

const APIinstance = new HTTP("https://ya-praktikum.tech/api/v2/chats");

export class TokenApi extends BaseAPI {
  public request (chatId: number) {
    return APIinstance.post(APIinstance.url + `/token/${chatId}`,
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        }
      });
  }
}
