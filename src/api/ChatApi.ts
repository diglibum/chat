import { HTTPTransport as HTTP } from "../modules/HTTPtransport";
import { BaseAPI } from "./BaseApi";

const chatAPIInstance = new HTTP("api/v1/chats");

export class ChatAPI extends BaseAPI {
  create () {
    return chatAPIInstance.post("/", { title: "string" });
  }

  request () {
    return chatAPIInstance.get("/full");
  }
}
