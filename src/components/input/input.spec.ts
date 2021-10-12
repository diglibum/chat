/* eslint-disable no-undef */
import { expect } from "chai";
import { Input } from ".";
import { Block } from "../../modules/block";
import { Props } from "../../types";
import { InputType } from "./types";
import { setupJsdom } from "../../utils/setupJsdom";

const dom = setupJsdom();
global.document = dom.window.document;

const context: Props = {
  isProfile: true,
  name: "inputName",
  value: "Input value",
  type: InputType.TEXT,
};
const input = new Input(context);
const fragment = input.getContent() as DocumentFragment;
const container = fragment.firstElementChild;
const htmlInput = fragment.querySelector("input");

describe("Input component", () => {
  it("input is instance of Block", () => {
    expect(input).to.be.an.instanceOf(Block);
  });

  it("input and container has classes", () => {
    expect(container?.getAttribute("class")).to.eq("input-profile");
    expect(htmlInput?.getAttribute("class")).to.eq("input-profile__input");
  });

  it("input has context attributes", () => {
    expect(htmlInput?.getAttribute("name")).to.eq(context.name);
    expect(htmlInput?.getAttribute("value")).to.eq(context.value);
    expect(htmlInput?.getAttribute("type")).to.eq(context.type);
  });

  it("show() adds input to document", () => {
    input.show();

    expect(document.querySelector("input")).to.eq(
      fragment?.querySelector("input")
    );
  });

  it("hide() removes input from document", () => {
    input.hide();

    expect(document.querySelector("input")).to.eq(null);
  });

  it("setProps() changes input props", () => {
    const newProps = {
      newProp: "text of new Prop",
    };

    input.setProps(newProps);

    expect(input.props.newProp).to.eq(newProps.newProp);
  });
});
