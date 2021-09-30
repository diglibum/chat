import { LogoutApi } from "../api/auth/LogoutApi";
import { SignInApi } from "../api/auth/SignInApi";
import { SignUpApi } from "../api/auth/SignUpApi";
import { UserLoginApi } from "../api/auth/UserLoginApi";
import { SignUpRequest } from "../api/types";
import { checkAllForm } from "../components/form/utils/formValidation";
import Store from "../modules/Store";
import { prepareDataToRequest } from "./utils/prepareDataToReques";

const signUpApi = new SignUpApi();
const signInApi = new SignInApi();
const logoutApi = new LogoutApi();
const userLoginApi = new UserLoginApi();

export class AuthController {
  public checkUser () {
    return userLoginApi.request()
      .then(data => {
        Store.setState({ isAuthorized: true, user: JSON.parse(data.responseText) });
        return (data);
      })
      .catch(() => {
        Store.setState({ isAuthorized: false });
      });
  }

  public signUp (form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form)) as SignUpRequest;
      signUpApi.request(data)
        .then(data => {
          return data;
        })
        .catch(reason => {
          console.log(reason);
        });
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  public signIn (form: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form)) as SignUpRequest;
      signInApi.request(data)
        .then(data => {
          return data;
        })
        .then(() => {
          this.checkUser();
        })
        .catch(reason => {
          console.log(reason);
        });
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  public logOut () {
    logoutApi.request()
      .then(data => {
        Store.setState({ isAuthorized: false, user: null });
        return data;
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}
