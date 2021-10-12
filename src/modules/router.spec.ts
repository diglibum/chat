/* eslint-disable no-undef */
import { expect } from "chai";
import * as sinon from "sinon";
import { Block } from "./block";
import { Route } from "./route";
import { Router } from "./router";
import { setupJsdom } from "../utils/setupJsdom";

const dom = setupJsdom();
global.window = dom.window;
class MainPage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
    return this.getContent();
  }
}

class SecondPage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
    return this.getContent();
  }
}

class ProfilePage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
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
