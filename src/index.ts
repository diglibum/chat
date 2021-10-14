import "./index.scss";
import { Router } from "./modules/router";
import { HomePage } from "./pages/home";
import { ProfilePage } from "./pages/profile";
import { ChatPage } from "./pages/chat";
import Store from "./modules/store";
import { AuthController } from "./controllers/authController";
import { ErrorPage } from "./pages/errors";

document.addEventListener("DOMContentLoaded", () => {
  const authController = new AuthController();
  const router = new Router("#root");

  authController.checkUser().then(() => {
    startRouting();
  });

  router
    .use("/", new HomePage({ inner: "login" }))
    .use("/sign-up", new HomePage({ inner: "registration" }))
    .use("/messenger", new ChatPage())
    .use("/settings", new ProfilePage())
    .use("/profile-edit", new ProfilePage({ inner: "profileEdit" }))
    .use("/password-edit", new ProfilePage({ inner: "passwordEdit" }))
    .use("/404", new ErrorPage({ inner: "404" }))
    .use("/500", new ErrorPage({ inner: "500" }));

  Store.registerEvent(startRouting);

  function startRouting() {
    const isAuthorized = Store.getState("isAuthorized");

    if (!isAuthorized) {
      router
        .clearRedirects()
        .redirect({ from: "/messenger", to: "/" })
        .redirect({ from: "/settings", to: "/" })
        .redirect({ from: "/profile-edit", to: "/" })
        .redirect({ from: "/password-edit", to: "/" });
    } else {
      router
        .clearRedirects()
        .redirect({ from: "/", to: "/messenger" })
        .redirect({ from: "/sign-up", to: "/messenger" });
    }
    router.start();
  }
});
