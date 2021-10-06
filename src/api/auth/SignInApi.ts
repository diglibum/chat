import { HTTPTransport as HTTP } from "../../modules/HTTPtransport";
import { BaseAPI } from "../BaseApi";
import { SignInRequest } from "../types";

const signInAPIInstance = new HTTP("https://ya-praktikum.tech/api/v2/auth");

export class SignInApi extends BaseAPI {
  public request (user: SignInRequest) {
    return signInAPIInstance.post(signInAPIInstance.url + "/signin",
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(user)
      });
  }
}