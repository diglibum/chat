import { Route } from "./Route";

export class Router {
    routes: Route[];
    history: History;
    private _currentRoute: null | Route;
    private _rootQuery: string;
    private static __instance: Router;

    constructor (rootQuery: string) {
      if (Router.__instance) {
        return Router.__instance;
      }

      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
      this._rootQuery = rootQuery;

      Router.__instance = this;
    }

    use (pathname: string, block: any) { // TODO
      const route = new Route(pathname, block, { rootQuery: this._rootQuery });
      this.routes.push(route);
      return this;
    }

    start () {
      window.onpopstate = event => {
        this._onRoute((<any>event.currentTarget).location.pathname); // TODO Window
      };

      this._onRoute(window.location.pathname);
    }

    _onRoute (pathname: string) {
      const route = this.getRoute(pathname);
      if (!route) {
        return;
      }

      if (this._currentRoute) {
        this._currentRoute.leave();
      }

      // route.render(route: Route, pathname: string); // TODO
      route.render();
      this._currentRoute = route;
    }

    go (pathname: string) {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    }

    back () {
      this.history.back();
    }

    forward () {
      this.history.forward();
    }

    getRoute (pathname: string) {
      return this.routes.find(route => route.match(pathname));
    }
}