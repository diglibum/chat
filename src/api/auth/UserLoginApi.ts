/* eslint-disable camelcase */
import { HTTPTransport as HTTP } from "../../modules/HTTPtransport";
import { BaseAPI } from "../BaseApi";

const signInAPIInstance = new HTTP("https://ya-praktikum.tech/api/v2/auth");

export class UserLoginApi extends BaseAPI {
  public request () {
    return signInAPIInstance.get(signInAPIInstance.url + "/user");
  }
}
