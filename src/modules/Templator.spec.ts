/* eslint-disable no-undef */
import { expect } from "chai";
import { Input } from "../components/input";
import { Templator } from "./Templator";
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

const template = `
    <div class="test-container">
        <div class="test-text">{{ text }}</div>
        <div class="test-component">{{ component }}</div>
    </div>
`;

const component = new Input({ name: "inputName" });
const context = {
  text: "some text",
  component,
  fragment: component.getContent()
};
const tmpl = new Templator(template);
const compiled = tmpl.compile(context);

describe("Templator", () => {
  it("compoled template instance of DocumentFragment", () => {
    expect(compiled).to.be.an.instanceOf(DocumentFragment);
  });

  it("{{ text }} is equal context.text", () => {
    const testText = compiled.querySelector(".test-text");

    expect(testText?.textContent).to.eq(context.text);
  });

  it("{{ component }} is equal context.component content", () => {
    const testComponent = compiled.querySelector(".test-component");

    expect(testComponent?.firstChild).to.eq(context.component.getContent());
  });
});
