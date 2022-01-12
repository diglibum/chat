import { UserPasswordRequest, UserProfileRequest } from "../api/types";
import { checkAllForm } from "../components/form/utils/formValidation";
import Store from "../modules/store";
import { prepareDataToRequest } from "./utils/prepareDataToRequest";
import { UserApi } from "../api/userApi";

const API = new UserApi();

class UsersController {
  public changeProfile(form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(
        new FormData(form)
      ) as UserProfileRequest;
      API.updateProfile(data)
        .then((user) => {
          Store.setState({ user });
        })
        .catch((reason) => {
          console.log(reason);
          return false;
        });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  public changePassword(form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form));
      API.updatePassword(<UserPasswordRequest>{
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).catch((reason) => {
        console.log(reason);
        return false;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  public changeAvatar(form?: HTMLFormElement) {
    const data = new FormData(form);
    API.changeAvatar(data).then((user) => {
      Store.setState({ user });
    });
  }
}

export const usersController = new UsersController();
