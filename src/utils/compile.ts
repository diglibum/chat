import { Block } from "../modules/Block";
import { v4 as uuidv4 } from "uuid";

export function compile (tmpl: (ctx: Record<string, any>) => string, context: Record<string, any>): DocumentFragment {
  const fragment = document.createElement("template");
  const components: Record<string, Block> = {};

  Object.entries(context).forEach(([key, value]) => {
    // Определяем, какие из переменных контекста — компоненты. Можно так не запариваться и просто передавать их отдельным параметром функции
    if (value instanceof Block) {
      const id = uuidv4();

      components[id] = value; // сохраняем компонент
      context[key] = `<div id="${id}"></div>`; // делаем заглушку
    }
  });

  fragment.innerHTML = tmpl(context); // или Handlebars.compile(tmpl, context), если tmpl — строка

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#${id}`);

    stub?.replaceWith(component.render()); // render должен вернуть HTMLElement
  });

  return fragment.content;
}
