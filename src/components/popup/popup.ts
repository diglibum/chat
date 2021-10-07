import { Block } from "../../modules/block";
import { Templator } from "../../modules/templator";
import popupTmpl from "./popup.tmpl";
import { PopupProps } from "./types";
import "./popup.scss";
export class Popup extends Block {
  constructor (props: PopupProps) {
    super("div", props);
  }

  close () {
    const fragment = this.getContent() as DocumentFragment;
    fragment.firstElementChild?.classList.add("hide");
  }

  open () {
    const fragment = this.getContent() as DocumentFragment;
    fragment.firstElementChild?.classList.remove("hide");
  }

  render () {
    const { title, body, className, hidePopup = true } = this.props;
    const tmpl = new Templator(popupTmpl);
    const context: PopupProps = {
      title,
      body,
      className,
      hidePopup
    };
    const fragment = tmpl.compile(context);
    const wrapper = fragment.querySelector(".popup__wrapper");
    wrapper?.addEventListener("click", (event) => {
      if (event.target === wrapper) {
        this.close();
      }
    });
    return fragment;
  }

  static closeAllPopups () {
    const popups = document.querySelectorAll(".popup");
    popups.forEach(popup => {
      popup.classList.add("hide");
    });
  }

  static addPopupTriggers (fragment?: DocumentFragment) {
    const triggers = (fragment ?? document).firstElementChild?.querySelectorAll("[data-popup]");
    triggers?.forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        Popup.closeAllPopups();
        const popupClassname = trigger.getAttribute("data-popup");
        const popup = document.querySelector(`.${popupClassname}`);
        popup?.classList.remove("hide");
      });
    });
  }
}
