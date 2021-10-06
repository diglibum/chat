import { HTTPTransport as HTTP } from "../HTTPtransport";
import { BaseAPI } from "../BaseApi";
import { FindUserRequest } from "../types";

const APIInstance = new HTTP("https://ya-praktikum.tech/api/v2/user");

export class UserSearch extends BaseAPI {
  findUser (data: FindUserRequest) {
    return APIInstance.post(
      APIInstance.url + "/search",
      {
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(data)
      });
  }
}
