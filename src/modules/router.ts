import { Block } from "./block";
import { Route } from "./route";

export interface Redirect {
  from: string;
  to: string;
}

export class Router {
  routes: Route[];
  redirects: Redirect[];
  history: History;
  currentRoute: null | Route;
  private _rootQuery: string;
  private static __instance: Router;

  constructor(rootQuery: string = "#root") {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.redirects = [];
    this.history = window.history;
    this.currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    if (this.redirects) {
      const redirect = this.getRedirect(window.location.pathname);
      if (redirect) {
        this.go(redirect.to);
      }
      window.onpopstate = (event) => {
        this._onRoute((event.currentTarget as Window).location.pathname);
      };
      this._onRoute(window.location.pathname);
    }
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go("/404");
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }
    route?.render();
    this.currentRoute = route!;
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  private getRedirect(pathname: string) {
    return this.redirects.find((redirect) => pathname === redirect.from);
  }

  redirect(item: Redirect) {
    this.redirects.push(item);
    return this;
  }

  clearRedirects() {
    this.redirects = [];
    return this;
  }
}
