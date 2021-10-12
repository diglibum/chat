import { HTTPTransport as HTTP } from "../HTTPtransport";
import { BaseAPI } from "../baseApi";

const APIinstance = new HTTP("https://ya-praktikum.tech/api/v2/chats");

export class TokenApi extends BaseAPI {
  public getToken(chatId: number) {
    return APIinstance.post(APIinstance.url + `/token/${chatId}`);
  }
}
