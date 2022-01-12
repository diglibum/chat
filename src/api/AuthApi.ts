import { HTTP } from "./HTTP";
import { SignInRequest, SignUpRequest } from "./types";

const API = new HTTP("/auth");

export class AuthApi {
  public logout() {
    return API.post(API.url + "/logout");
  }

  public signIn(user: SignInRequest) {
    return API.post(API.url + "/signin", {
      data: user,
    });
  }

  public signUp(user: SignUpRequest) {
    return API.post(API.url + "/signup", {
      data: user,
    });
  }

  public getUser() {
    return API.get(API.url + "/user");
  }
}
