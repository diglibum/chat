import { LogoutApi } from "../api/auth/logoutApi";
import { SignInApi } from "../api/auth/signInApi";
import { SignUpApi } from "../api/auth/signUpApi";
import { UserLoginApi } from "../api/auth/userLoginApi";
import { SignUpRequest } from "../api/types";
import { checkAllForm } from "../components/form/utils/formValidation";
import Store, { unAuthorizedState } from "../modules/store";
import { prepareDataToRequest } from "./utils/prepareDataToRequest";
import ChatController from "./chatController";

const signUpApi = new SignUpApi();
const signInApi = new SignInApi();
const logoutApi = new LogoutApi();
const userLoginApi = new UserLoginApi();

export class AuthController {
  public checkUser() {
    return userLoginApi
      .userLogin()
      .then((user) => {
        Store.setState({ isAuthorized: true, user });
        ChatController.getChats();
      })
      .catch(() => {
        Store.setState({ isAuthorized: false, user: null });
      });
  }

  public signUp(form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form)) as SignUpRequest;
      signUpApi
        .signUp(data)
        .then(() => {
          this.checkUser();
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  public signIn(form: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form)) as SignUpRequest;
      signInApi
        .signIn(data)
        .then(() => {
          this.checkUser();
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  public logOut() {
    logoutApi
      .logout()
      .then(() => {
        Store.setState({ ...unAuthorizedState });
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}
