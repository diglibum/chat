import { HTTPTransport as HTTP } from "../modules/HTTPtransport";
import { BaseAPI } from "./BaseApi";

const chatMessagesAPIInstance = new HTTP("api/v1/messages");

export class ChatMessagesAPI extends BaseAPI {
  request ({ id }) {
    return chatMessagesAPIInstance.get(`/${id}`);
  }
}
