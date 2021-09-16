import { Block } from "../modules/Block";

export function render (query: string, block: Block) {
  const root = document.querySelector(query);
  if (root?.hasChildNodes) {
    root.replaceChildren(block.getContent());
  } else {
    root?.appendChild(block.getContent());
  }
  return root;
}
