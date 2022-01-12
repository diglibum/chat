import { HTTP } from "./HTTP";
import {
  FindUserRequest,
  UserPasswordRequest,
  UserProfileRequest,
} from "./types";

const API = new HTTP("/user");

export class UserApi {
  public updateProfile(user: UserProfileRequest) {
    return API.put(API.url + "/profile", {
      data: user,
    });
  }

  public changeAvatar(data: FormData) {
    return API.put(API.url + "/profile/avatar", {
      data,
      isRaw: true,
    });
  }

  public searchUser(data: FindUserRequest) {
    return API.post(API.url + "/search", {
      data,
    });
  }

  public updatePassword(pass: UserPasswordRequest) {
    return API.put(API.url + "/password", {
      data: pass,
    });
  }
}
