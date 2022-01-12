import { Templator } from "../../../../modules/templator";
import profileViewTmpl from "./profileView.tmpl";
import "./profileView.scss";
import { Input } from "../../../../components/input";
import { Block } from "../../../../modules/block";
import { Props } from "../../../../types";
import { InputType } from "../../../../components/input/types";
import { authController } from "../../../../controllers/authController";
import { Link } from "../../../../modules/link";
import Store from "../../../../modules/store";

export class ProfileView extends Block {
  controller = authController;

  constructor(props: Props = {}) {
    super("div", props);
    Store.registerEvent(this.reRender, this);
  }

  render() {
    const tmpl = new Templator(profileViewTmpl);
    const user = Store.getState("user");

    const mailInput = new Input({
      name: "email",
      text: "Почта",
      value: user ? user.email : "",
      required: true,
      disabled: true,
      type: InputType.EMAIL,
      isProfile: true,
    });

    const loginInput = new Input({
      name: "login",
      text: "Логин",
      value: user ? user.login : "",
      required: true,
      disabled: true,
      isProfile: true,
    });

    const firstNameInput = new Input({
      name: "first_name",
      text: "Имя",
      value: user ? user.first_name : "",
      required: true,
      disabled: true,
      isProfile: true,
    });

    const secondNameInput = new Input({
      name: "second_name",
      text: "Фамилия",
      value: user ? user.second_name : "",
      disabled: true,
      isProfile: true,
    });

    const displayNameInput = new Input({
      name: "display_name",
      text: "Имя в чате",
      value: user ? user.display_name : "",
      disabled: true,
      isProfile: true,
    });

    const phoneInput = new Input({
      name: "phone",
      text: "Телефон",
      value: user ? user.phone : "",
      type: InputType.TEL,
      required: true,
      disabled: true,
      isProfile: true,
    });

    const profileEditLink = new Link({
      to: "/profile-edit",
      label: "Изменить данные",
    });

    const passwordEditLink = new Link({
      to: "/password-edit",
      label: "Изменить пароль",
    });

    const context = {
      mailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      phoneInput,
      profileEditLink,
      passwordEditLink,
    };

    const fragment = tmpl.compile(context);
    const logoutBtn = fragment.querySelector(".profile-view__link_logout");

    logoutBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      this.controller.logOut();
    });

    return fragment;
  }
}
