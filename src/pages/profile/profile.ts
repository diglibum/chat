import { Templator } from "../../modules/Templator";
import profilePageTmpl from "./profile.tmpl";
import "./profile.scss";
import { ProfileView } from "./modules/profileView";
import { ProfileEdit } from "./modules/profileEdit";
import { PasswordEdit } from "./modules/passwordEdit";
import { Block } from "../../modules/Block";
import { Props } from "../../types/props";
import Store from "../../modules/Store";

export class ProfilePage extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const user = Store.getState("user");
    const userName = (user) ? user.first_name : "";
    const { inner } = this.props;
    const tmpl = new Templator(profilePageTmpl);
    let context = {};

    switch (inner) {
      case "profileEdit":
        context = {
          header: userName,
          content: new ProfileEdit()
        };
        break;
      case "passwordEdit":
        context = {
          header: userName,
          content: new PasswordEdit()
        };
        break;
      default:
        context = { header: userName, content: new ProfileView() };
        break;
    }
    return tmpl.compile(context);
  }
}
