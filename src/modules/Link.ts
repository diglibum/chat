import { Props } from "../types";
import { Router } from "./Router";

export class Link {
    private _element: Node;
    private _pathname: string;
    private _body: string;
    private _className: string | undefined;

    constructor (props: Props) {
      const { to, label, className } = props;
      this._pathname = to;
      this._body = label;
      this._className = className;
      this.render();
    }

    render () {
      const link = document.createElement("a");
      link.href = this._pathname;
      link.classList.add(this._className!);
      link.innerText = this._body;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Router("#root").go(this._pathname);
      });
      this._element = link;
    }

    getContent () {
      return this._element;
    }
}
