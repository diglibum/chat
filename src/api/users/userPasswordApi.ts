import { HTTPTransport as HTTP } from "../HTTPtransport";
import { BaseAPI } from "../baseApi";
import { UserPasswordRequest } from "../types";

const APIinstance = new HTTP("https://ya-praktikum.tech/api/v2/user");

export class UserPasswordApi extends BaseAPI {
  public updatePass(pass: UserPasswordRequest) {
    return APIinstance.put(APIinstance.url + "/password", {
      data: pass,
    });
  }
}
