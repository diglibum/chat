import { ChatApi } from "../api/chats/ChatApi";
import { TokenApi } from "../api/chats/TokenApi";
import { BaseRequest } from "../api/types";
import { checkAllForm } from "../components/form/utils";
import Store from "../modules/Store";
import { prepareDataToRequest } from "./utils/prepareDataToReques";

const tokenAPIinstance = new TokenApi();
const chatAPIInstance = new ChatApi();

export class ChatController {
  public getToken () {
    return tokenAPIinstance.request(1)
      .then((data) => {
        const token = JSON.parse(data.response).token;
        if (token) {
          Store.setState({ token: token });
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  createChat (form?: HTMLFormElement) {
    try {
      const validateData = checkAllForm(form!);
      if (!validateData) {
        throw new Error("ошибка валидации");
      }
      const data = prepareDataToRequest(new FormData(form)) as BaseRequest;
      chatAPIInstance.create(data)
        .then(() => {
          this.getChats();
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  getChats () {
    try {
      chatAPIInstance.getChats()
        .then((data) => {
          const chats = JSON.parse(data.response);
          if (chats) {
            Store.setState({ chats });
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch {

    }
  }
}
