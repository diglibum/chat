import { Props } from "../types";
import { render as renderDOM } from "../utils";
import { Block } from "./block";

export class Route {
    private _pathname: string;
    private _blockClass: Block;
    private _block: null | Block;
    private _props: Props;

    constructor (pathname: string, view: Block, props: Props) {
      this._pathname = pathname;
      this._blockClass = view;
      this._block = null;
      this._props = props;
    }

    navigate (pathname: string) {
      if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
      }
    }

    leave () {
      if (this._block) {
        this._block.hide();
      }
    }

    match (pathname: string) {
      return (pathname === this._pathname);
    }

    render () {
      if (!this._block) {
        this._block = this._blockClass;
        renderDOM(this._props.rootQuery as string, this._block);
        return;
      }

      this._block.show();
    }
}
