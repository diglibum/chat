/* eslint-disable camelcase */
import { HTTPTransport as HTTP } from "../HTTPtransport";
import { BaseAPI } from "../baseApi";

const signInAPIInstance = new HTTP("https://ya-praktikum.tech/api/v2/auth");

export class UserLoginApi extends BaseAPI {
  public userLogin() {
    return signInAPIInstance.get(signInAPIInstance.url + "/user");
  }
}
