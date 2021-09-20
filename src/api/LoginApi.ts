
import { HTTPTransport as HTTP } from "../modules/HTTPtransport";
import { BaseAPI } from "./BaseApi";

const authAPIInstance = new HTTP("api/v1/messages");

export class LoginAPI extends BaseAPI {
  public request (user: LoginRequest) {
    return authAPIInstance.post<LoginRequest, LoginResponse>("/login", user)
      .then(({ user_id }) => user_id);
  }
}
