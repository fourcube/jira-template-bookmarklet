import { makeAutoObservable } from "mobx";
import { ConfigState } from "./config.state";
import { EditorState } from "./editor.state";

export type ActiveView = "config" | number;

export class UiState {
  activeView: ActiveView = 0;
  editors = [new EditorState()];
  config = new ConfigState();

  constructor() {
    makeAutoObservable(this);
  }

  setActiveView(view: ActiveView) {
    this.activeView = view;
  }

  getActiveEditor() {
    if (this.activeView === "config") {
      return null;
    }
    return this.editors[this.activeView];
  }
}

export const ui = new UiState();
