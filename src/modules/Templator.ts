import { Block } from "./Block";
import { v4 as uuidv4 } from "uuid";

type templateContext = {
  [key: string]: unknown;
}

export class Templator {
  private TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  private _template: string;

  constructor (template: string) {
    this._template = template;
  }

  compile (ctx: templateContext) {
    return this._compileTemplate(ctx);
  }

  private _compileTemplate = (ctx: templateContext) => {
    let tmpl: string = this._template;
    let key: RegExpExecArray | null;

    const components: Record<string, Block> = {};
    const fragments: Record<string, DocumentFragment> = {};

    const regExp = this.TEMPLATE_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = this._get(ctx, tmplValue);
        let stub: string | null = null;

        // if Document-fragment
        if (data instanceof DocumentFragment) {
          const id = uuidv4();
          fragments[id] = data;
          stub = `<div id="${id}"></div>`;
        }

        // if Block-component
        if (data instanceof Block) {
          const id = uuidv4();
          components[id] = data;
          stub = `<div id="${id}"></div>`;
        }

        tmpl = tmpl.replace(new RegExp(key[0], "gi"), stub ?? ((data === undefined) ? "" : data));
      }
    }

    const container = document.createElement("template");
    container.innerHTML = tmpl;

    if (Object.keys(components).length > 0) {
      Object.entries(components).forEach(([id, component]) => {
        const root = container.content.getElementById(id);
        root?.replaceWith(component.getContent());
      });
    }

    if (Object.keys(fragments).length > 0) {
      Object.entries(fragments).forEach(([id, fragment]) => {
        const root = container.content.getElementById(id);
        root?.replaceWith(fragment);
      });
    }

    return container.content;
  }

  private _get (obj: Record<string, any>, path: string, defaultValue?: unknown): any {
    const keys = path.split(".");
    let result = obj;

    for (const key of keys) {
      result = result[key];

      if (result === undefined) {
        return defaultValue;
      }
    }

    return result ?? defaultValue;
  }
}
