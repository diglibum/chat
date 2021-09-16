import "./index.scss";
import { Router } from "./modules/Router";
import { HomePage } from "./pages/home";
import { ProfilePage } from "./pages/profile";
import { ChatPage } from "./pages/chat";
// import { errorPage } from "./pages/errors";

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router("#root");

  router
    .use("/", new HomePage({ inner: "login" }))
    .use("/sign-up", new HomePage({ inner: "registration" }))
    .use("/settings", new ProfilePage())
    .use("/profile-edit", new ProfilePage({ inner: "profileEdit" }))
    .use("/password-edit", new ProfilePage({ inner: "passwordEdit" }))
    .use("/messenger", new ChatPage())
    .start();

  // const root: Element | null = document.querySelector("#root");
  // let inner: string | null;

  // switch (document.location.pathname) {
  //   case "/":
  //     inner = homePage("login");
  //     break;

  //   case "/registration/":
  //     inner = homePage("registration");
  //     break;

  //   case "/profile/":
  //     inner = profilePage();
  //     break;

  //   case "/profile-edit/":
  //     inner = profilePage("profileEdit");
  //     break;

  //   case "/password-edit/":
  //     inner = profilePage("passwordEdit");
  //     break;

  //   case "/chat-page/":
  //     inner = chatPage();
  //     break;

  //   case "/500/":
  //     inner = errorPage("500");
  //     break;

  //   default:
  //     inner = errorPage("404");
  //     break;
  // }

  // if (root !== null) {
  //   root.innerHTML = inner;
  // }
});
