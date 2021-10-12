/* eslint-disable no-undef */
import { expect } from "chai";
import { Input } from "../components/input";
import { Templator } from "./templator";

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
  fragment: component.getContent(),
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
