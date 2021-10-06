import { Templator } from "../../modules/Templator";
import profilePageTmpl from "./profile.tmpl";
import "./profile.scss";
import { ProfileView } from "./modules/profileView";
import { ProfileEdit } from "./modules/profileEdit";
import { PasswordEdit } from "./modules/passwordEdit";
import { Block } from "../../modules/Block";
import { Props } from "../../types/props";
import Store from "../../modules/Store";
import { Popup } from "../../components/popup/Popup";
import { Form } from "../../components/form";
import avatarFormTmpl from "./avatarForm.tmpl";
import { UsersController } from "../../controllers/UsersController";

const controller = new UsersController();

export class ProfilePage extends Block {
  constructor (props: Props = {}) {
    super("div", props);
    Store.registerEvent(this.reRender, this);
  }

  render () {
    const user = Store.getState("user");
    const userName = (user) ? user.first_name : "";
    const { inner } = this.props;
    const tmpl = new Templator(profilePageTmpl);

    const form = new Form({
      name: "addAvatar",
      body: avatarFormTmpl
    });

    const popup = new Popup({
      title: "Загрузите файл",
      body: form,
      className: "add-avatar__popup"
    });

    const context: Props = {
      header: userName,
      popup
    };
    if (user?.avatar) {
      context.avatar = "https://ya-praktikum.tech/api/v2/resources" + user.avatar;
    }

    switch (inner) {
      case "profileEdit":
        context.content = new ProfileEdit();
        break;
      case "passwordEdit":
        context.content = new PasswordEdit();
        break;
      default:
        context.content = new ProfileView();
        break;
    }

    const fragment = tmpl.compile(context);
    Popup.addPopupTriggers(fragment);

    const avatarForm = (popup.getContent() as DocumentFragment).querySelector("form");
    avatarForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      controller.changeAvatar(avatarForm);
      popup.close();
    });
    return fragment;
  }
}
