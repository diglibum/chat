import { SignUpRequest } from "./types";
import { HTTPTransport as HTTP } from "../modules/HTTPtransport";

const signUpAPIInstance = new HTTP("ya-praktikum.tech/api/v2/auth");

export class SignUpApi {
  public request (user: SignUpRequest): Promise<XMLHttpRequest> {
    return signUpAPIInstance.post("/signup", <any>user)
      .then(({ user_id: userId }) => userId);
  }
}
