import { HTTPTransport as HTTP } from "../../modules/HTTPtransport";
import { BaseAPI } from "../BaseApi";

const logoutAPIInstance = new HTTP("https://ya-praktikum.tech/api/v2/auth");

export class LogoutApi extends BaseAPI {
  public request () {
    return logoutAPIInstance.post(logoutAPIInstance.url + "/logout");
  }
}
