import { UserPasswordRequest, UserProfileRequest } from "../api/types";
import { UserPasswordApi } from "../api/users/userPasswordApi";
import { UserProfileApi } from "../api/users/userProfileApi";
import { checkAllForm } from "../components/form/utils/formValidation";
import Store from "../modules/store";
import { prepareDataToRequest } from "./utils/prepareDataToReques";

const userProfileApi = new UserProfileApi();
const userPasswordApi = new UserPasswordApi();
export class UsersController {
  public changeProfile (form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form)) as UserProfileRequest;
      userProfileApi.update(data)
        .then(data => {
          Store.setState({ user: JSON.parse(data.responseText) });
          return data;
        })
        .catch(reason => {
          console.log(reason);
          return false;
        });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  public changePassword (form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form));
      userPasswordApi.update(<UserPasswordRequest>{ oldPassword: data.oldPassword, newPassword: data.newPassword })
        .then(data => {
          return data;
        })
        .catch(reason => {
          console.log(reason);
          return false;
        });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  public changeAvatar (form?: HTMLFormElement) {
    const data = new FormData(form);
    userProfileApi.changeAvatar(data)
      .then(data => {
        Store.setState({ user: JSON.parse(data.response) });
      });
  }
}
