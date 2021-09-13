import { Block } from "../modules/Block";

export function render (query: string, block: Block) { // TODO
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}
