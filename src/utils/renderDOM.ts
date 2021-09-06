import { Block } from "../modules/block";

export function render (query: string, block: Block) { // TODO
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}
