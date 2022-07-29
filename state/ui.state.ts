import { makeAutoObservable } from "mobx";
import { ConfigState } from "./config.state";
import { EditorState } from "./editor.state";

export type ActiveView = "config" | number;

export class UiState {
  private _activeView: ActiveView = 0;

  editors = [new EditorState()];
  config = new ConfigState();

  constructor() {
    makeAutoObservable(this);
  }

  getActiveEditor() {
    if (this.activeView === "config") {
      return null;
    }
    return this.editors[this.activeView];
  }

  public get activeView(): ActiveView {
    return this._activeView;
  }

  public set activeView(activeView: ActiveView) {
    this._activeView = activeView;
  }
}

export const ui = new UiState();
