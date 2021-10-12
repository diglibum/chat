import { HTTPTransport as HTTP } from "../HTTPtransport";
import { BaseAPI } from "../baseApi";

const logoutAPIInstance = new HTTP("https://ya-praktikum.tech/api/v2/auth");

export class LogoutApi extends BaseAPI {
  public logout() {
    return logoutAPIInstance.post(logoutAPIInstance.url + "/logout");
  }
}
