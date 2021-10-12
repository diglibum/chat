import { Block } from "./block";
import { Link } from "./link";
import { v4 as uuidv4 } from "uuid";
import { getValueFromPath } from "../utils";

type TemplateContext = {
  [key: string]: unknown;
};

enum BLOCKS {
  ARRAY = "arrays",
  BLOCK = "components",
  LINK = "links",
  FRAGMENT = "fragments",
}
type BlocksTypes = Block | DocumentFragment | Link | string | BlocksTypes[];
export class Templator {
  private TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  private IF_TEMPLATE_REGEXP =
    /\{\{(#if (?<key>.*?))\}\}[\s]*(?<value>.*?)[\s]*\{\{\/if\}\}/gim;
  private _template: string;

  constructor(template: string) {
    this._template = template;
  }

  compile(ctx: TemplateContext) {
    return this._compileTemplate(ctx);
  }

  private _compileTemplate = (ctx: TemplateContext) => {
    let tmpl: string = this._template;
    let res: RegExpExecArray | null;
    const tmplObjects: any = {
      components: {},
      fragments: {},
      links: {},
      arrays: {},
    };
    const regExp: RegExp = this.TEMPLATE_REGEXP;

    tmpl = this._compileIfBlock(tmpl, ctx);
    let compiledTmpl = tmpl;

    while ((res = regExp.exec(tmpl))) {
      let stub: string | null = null;
      const key = res[1].trim();
      const data = getValueFromPath(ctx, key);

      if (data) {
        const dataType = this._checkType(data);
        if (dataType) {
          const id = uuidv4();
          tmplObjects[dataType][id] = data;
          stub = this._createStub(id);
        }
      }
      compiledTmpl = compiledTmpl.replace(
        new RegExp(res[0].trim(), "gi"),
        data ? stub ?? data : ""
      );
    }
    const container = document.createElement("template");
    container.innerHTML = compiledTmpl;

    Object.keys(tmplObjects).forEach((key) => {
      this._replaceStubs(key, tmplObjects[key], container);
    });

    return container.content;
  };

  private _checkType(data: any) {
    if (Array.isArray(data)) {
      return BLOCKS.ARRAY;
    }
    if (data instanceof DocumentFragment) {
      return BLOCKS.FRAGMENT;
    }
    if (data instanceof Block) {
      return BLOCKS.BLOCK;
    }
    if (data instanceof Link) {
      return BLOCKS.LINK;
    }
  }

  private _createStub(id: string) {
    return `<div id="${id}"></div>`;
  }

  private _replaceStubs(
    dataType: BlocksTypes,
    arr: Record<string, BlocksTypes>,
    container: HTMLTemplateElement
  ) {
    if (Object.keys(arr).length > 0) {
      Object.entries(arr).forEach(([id, item]) => {
        const root = container.content.getElementById(id);

        switch (dataType) {
          case BLOCKS.ARRAY:
            (item as BlocksTypes[]).forEach((element) => {
              const tmpl = new Templator("{{ item }}");
              const compiledItem = tmpl.compile({ item: element });
              root?.appendChild(compiledItem);
            });
            break;

          case BLOCKS.BLOCK:
            root?.replaceWith((item as Block).getContent());
            break;

          case BLOCKS.LINK:
            root?.replaceWith((item as Link).getContent());
            break;

          case BLOCKS.FRAGMENT:
            root?.replaceWith(item as DocumentFragment);
        }
      });
    }
  }

  private _compileIfBlock(tmpl: string, ctx: TemplateContext): string {
    let res: RegExpExecArray | null;
    const regExp: RegExp = this.IF_TEMPLATE_REGEXP;
    let compiledTmpl = tmpl;

    while ((res = regExp.exec(tmpl))) {
      const key = res!.groups!.key.trim();
      const value = res!.groups!.value.trim();
      const ctxValue = getValueFromPath(ctx, key);
      compiledTmpl = compiledTmpl.replace(
        res[0].trim(),
        ctxValue!! ? value : ""
      );
    }

    return compiledTmpl;
  }
}
