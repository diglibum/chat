import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { Input } from "../../components/input";
import { InputType, InputValidationType } from "../../components/input/types";
import { Block } from "../../modules/Block";
import { Templator } from "../../modules/Templator";
import { Props } from "../../types";
import devTmpl from "./dev.tmpl";

export class DevPage extends Block {
  constructor (props: Props = {}) {
    super("div", props);
  }

  render () {
    const tmpl = new Templator(devTmpl);

    const input = new Input({
      disabled: true,
      type: InputType.TEXT,
      text: "Логин",
      required: true,
      validationType: InputValidationType.LOGIN
    });

    const button = new Button({
      text: "Отправить",
      type: "submit"
    });

    const context = {
      header: "Try it out",
      content: "Сделаем index.html и в теге script отправим запрос на авторизацию (не используя Postman , Owasp ZAP и т. д.). Он будет отправлен из браузера:",
      input,
      button
    };
    const form = new Form(
      {
        name: "Форма",
        body: tmpl.compile(context)
      }
    );

    return form.getContent();
  }
}
