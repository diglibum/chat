/* eslint-disable no-undef */
import { expect } from "chai";
import { Input } from ".";
import { Block } from "../../modules/block";
import { Props } from "../../types";
import { InputType } from "./types";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chat</title>
    </head>
    <body>
        <div id="root"></div>    
    </body>
    </html>
    `,
    { url: "http://localhost:3000" }
);

global.window = window;
global.document = window.document;

const context: Props = {
  isProfile: true,
  name: "inputName",
  value: "Input value",
  type: InputType.TEXT
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

    expect(document.querySelector("input")).to.eq(fragment?.querySelector("input"));
  });

  it("hide() removes input from document", () => {
    input.hide();

    expect(document.querySelector("input")).to.eq(null);
  });

  it("setProps() changes input props", () => {
    const newProps = {
      newProp: "text of new Prop"
    };

    input.setProps(newProps);

    expect(input.props.newProp).to.eq(newProps.newProp);
  });
});
