import { Block } from "../modules/Block";

export function renderDOM (block: Block, query: string = "#root") {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}

export function removeDOM (block: Block, query: string = "#root") {
  const root = document.querySelector(query);
  root!.textContent = "";
  return root;
}
