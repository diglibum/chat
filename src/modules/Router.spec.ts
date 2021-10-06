/* eslint-disable no-undef */
import { expect } from "chai";
import { ChatPage } from "../pages/chat";
import { ProfilePage } from "../pages/profile";
import { Router } from "./Router";

describe("Router", () => {
  it("use adds Route to the Router.routes", () => {
    const router = new Router();
    router.use("/messenger", new ChatPage());
    router.use("/settings", new ProfilePage());

    expect(router.routes.length).to.eq(2);
    expect(router.routes[0]).to.be.an(typeof ChatPage);
    expect(router.routes[1]).to.be.an(typeof ProfilePage);
  });
});
