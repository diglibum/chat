import { HTTPTransport as HTTP } from "../modules/HTTPtransport";
import { BaseAPI } from "./base-api";

const chatMessagesAPIInstance = new HTTP("api/v1/messages");

export class chatMessagesAPI extends BaseAPI {
  request ({ id }) {
    return chatMessagesAPIInstance.get(`/${id}`);
  }
}
