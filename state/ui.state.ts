import { makeAutoObservable } from "mobx";
import { taskTemplate } from "../data/defaultTemplate";
import { ConfigState } from "./config.state";
import { EditorState } from "./editor.state";

export type ActiveView = "config" | number;

export class UiState {
  private _activeView: ActiveView = 0;

  editors = [new EditorState("Story"), new EditorState("Task", taskTemplate)];
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

  removeCurrentEditor() {
    if (this.activeView === "config") {
      return;
    }
    this.editors.splice(this.activeView, 1);
    this.activeView = Math.max(this.activeView - 1, 0);
  }

  createEditor() {
    this.editors.push(new EditorState("Template", "h1. Title"));
    this.activeView = this.editors.length - 1;
  }

  public get activeView(): ActiveView {
    return this._activeView;
  }

  public set activeView(activeView: ActiveView) {
    this._activeView = activeView;
  }

  public serialize() {
    return {
      activeView: this.activeView,
      editors: this.editors.map((e) => e.serialize()),
      config: this.config.serialize(),
    };
  }

  public static deserialize(obj: UiState): UiState {
    const ui = new UiState();
    ui.config = ConfigState.deserialize(obj.config);
    ui.editors = obj.editors.map((e) => EditorState.deserialize(e));
    ui.activeView = obj.activeView;
    return ui;
  }
}

let loadedUi: UiState;
try {
  if (typeof window === "undefined") {
    loadedUi = new UiState();
  } else {
    const config = window.localStorage.getItem("jira-template-state");
    if (!config) {
      throw new Error("No config exists. That's expected on the first run.");
    }
    const state = JSON.parse(config);
    loadedUi = UiState.deserialize(state);
  }
} catch (e) {
  console.error(e);
  loadedUi = new UiState();
}

export const ui = loadedUi;
