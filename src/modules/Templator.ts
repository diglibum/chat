import { Block } from "./Block";
import { v4 as uuidv4 } from "uuid";

type TemplateContext = {
  [key: string]: unknown;
}

export class Templator {
  private TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  private IF_TEMPLATE_REGEXP = /\{\{(#if (?<key>.*?))\}\}[\s]*(?<value>.*?)[\s]*\{\{\/if\}\}/gim;
  private _template: string;

  constructor (template: string) {
    this._template = template;
  }

  compile (ctx: TemplateContext) {
    return this._compileTemplate(ctx);
  }

  private _compileTemplate = (ctx: TemplateContext) => {
    let tmpl: string = this._template;
    let res: RegExpExecArray | null;
    const components: Record<string, Block> = {};
    const fragments: Record<string, DocumentFragment> = {};
    const regExp: RegExp = this.TEMPLATE_REGEXP;

    tmpl = this._compileIfBlock(tmpl, ctx);
    let compiledTmpl = tmpl;

    while ((res = regExp.exec(tmpl))) {
      let stub: string | null = null;
      const key = res[1].trim();
      const data = this._getValueFromPath(ctx, key);

      // Document-fragment
      if (data instanceof DocumentFragment) {
        const id = uuidv4();
        fragments[id] = data;
        stub = `<div id="${id}"></div>`;
      }

      // Block-component
      if (data instanceof Block) {
        const id = uuidv4();
        components[id] = data;
        stub = `<div id="${id}"></div>`;
      }

      compiledTmpl = compiledTmpl.replace(new RegExp(res[0].trim(), "gi"), ((data) ? (stub ?? data) : ""));
    }

    const container = document.createElement("template");
    container.innerHTML = compiledTmpl;

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

  private _compileIfBlock (tmpl: string, ctx: TemplateContext): string {
    let res: RegExpExecArray | null;
    const regExp: RegExp = this.IF_TEMPLATE_REGEXP;
    let compiledTmpl = tmpl;

    while ((res = regExp.exec(tmpl))) {
      const key = res!.groups!.key.trim();
      const value = res!.groups!.value.trim();
      const ctxValue = this._getValueFromPath(ctx, key);
      compiledTmpl = compiledTmpl.replace(res[0].trim(), ((ctxValue!!) ? value : ""));
    }

    return compiledTmpl;
  }

  private _getValueFromPath (obj: Record<string, any>, path: string): any {
    const keys = path.split(".");
    let result = obj;

    for (const key of keys) {
      result = result[key];
    }

    return result;
  }
}
