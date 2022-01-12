import { SignUpRequest } from "../api/types";
import { checkAllForm } from "../components/form/utils/formValidation";
import Store, { unAuthorizedState } from "../modules/store";
import { prepareDataToRequest } from "./utils/prepareDataToRequest";
import { chatController } from "./ChatController";
import { AuthApi } from "../api/authApi";

const API = new AuthApi();

class AuthController {
  public checkUser() {
    return API.getUser()
      .then((user) => {
        Store.setState({ isAuthorized: true, user });
        chatController.getChats();
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
      API.signUp(data)
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
      API.signIn(data)
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
    API.logout()
      .then(() => {
        Store.setState({ ...unAuthorizedState });
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}

export const authController = new AuthController();
