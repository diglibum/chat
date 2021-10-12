import { Block } from "../modules/block";

export class RenderDOM {
  append(block: Block, query: string = "#root") {
    const root = document.querySelector(query);
    root?.appendChild(block.getContent());
    return root;
  }

  remove(block: Block, query: string = "#root") {
    const root = document.querySelector(query);
    root!.textContent = "";
    return root;
  }
}
