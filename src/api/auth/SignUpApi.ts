import { HTTPTransport as HTTP } from "../../modules/HTTPtransport";
import { BaseAPI } from "../BaseApi";
import { SignUpRequest } from "../types";

const signUpAPIInstance = new HTTP("https://ya-praktikum.tech/api/v2/auth");

export class SignUpApi extends BaseAPI {
  public request (user: SignUpRequest) {
    return signUpAPIInstance.post(signUpAPIInstance.url + "/signup",
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(user)
      });
  }
}
