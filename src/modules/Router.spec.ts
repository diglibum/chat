/* eslint-disable no-undef */
import { expect } from "chai";
import * as sinon from "sinon";
import { Block } from "./Block";
import { Route } from "./Route";
import { Router } from "./Router";

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

class MainPage extends Block {
  constructor () {
    super("div", {});
  }

  render () {
    return this.getContent();
  }
}
class SecondPage extends Block {
  constructor () {
    super("div", {});
  }

  render () {
    return this.getContent();
  }
}
class ProfilePage extends Block {
  constructor () {
    super("div", {});
  }

  render () {
    return this.getContent();
  }
}

describe("Router", () => {
  const router = new Router();

  it("use() adds Route to the Router.routes", () => {
    router
      .use("/", new MainPage())
      .use("/messenger", new SecondPage())
      .use("/profile", new ProfilePage());

    expect(router.routes.length).to.eq(3);
    expect(router.routes[0]).to.be.an.instanceOf(Route);
    expect(router.routes[1]).to.be.an.instanceOf(Route);
  });

  it("start() make start page /", () => {
    router.start();

    expect(window.location.pathname).to.be.eq("/");
  });

  it("go() goes to Route page", () => {
    const historyLength = window.history.length;

    router.go("/profile");
    router.go("/messenger");

    expect(window.history.length).to.eq(historyLength + 2);
    expect(window.location.pathname).to.eq("/messenger");
  });

  it("back() changes window.location", () => {
    const spy = sinon.spy(window.history, "back");

    router.back();

    expect(spy.callCount).to.eq(1);
  });

  it("forward() changes window.location", () => {
    const spy = sinon.spy(window.history, "forward");

    router.forward();

    expect(spy.callCount).to.eq(1);
  });
});
