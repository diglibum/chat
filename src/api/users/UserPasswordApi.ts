import { HTTPTransport as HTTP } from "../../modules/HTTPtransport";
import { BaseAPI } from "../BaseApi";
import { UserPasswordRequest } from "../types";

const APIinstance = new HTTP("https://ya-praktikum.tech/api/v2/user");

export class UserPasswordApi extends BaseAPI {
  public update (pass: UserPasswordRequest) {
    return APIinstance.put(APIinstance.url + "/password",
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(pass)
      });
  }
}
