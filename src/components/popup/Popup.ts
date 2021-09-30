import { Block } from "../../modules/Block";
import { Templator } from "../../modules/Templator";
import popupTmpl from "./popup.tmpl";
import { PopupProps } from "./types";
import "./popup.scss";

export class Popup extends Block {
  constructor (props: PopupProps) {
    super("div", props);
  }

  render () {
    const { title, body, className } = this.props;
    const tmpl = new Templator(popupTmpl);
    const context = {
      title,
      body,
      className
    };
    const fragment = tmpl.compile(context);
    const popup = fragment.querySelector(".popup");
    const wrapper = fragment.querySelector(".popup__wrapper");
    wrapper?.addEventListener("click", (event) => {
      if (event.target === wrapper) {
        popup?.classList.add("hide");
      }
    });
    return fragment;
  }
}
