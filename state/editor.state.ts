import { makeAutoObservable } from "mobx";
import { defaultTemplate } from "../data/defaultTemplate";

export class EditorState {
  template: string = "";

  constructor(template?: string) {
    if (!template) {
      this.template = defaultTemplate;
    }
    makeAutoObservable(this);
  }
}
