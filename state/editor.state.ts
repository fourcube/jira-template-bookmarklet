import { makeAutoObservable } from "mobx";
import { storyTemplate } from "../data/defaultTemplate";
import { defaultIssueTypes } from "./config.state";

export class EditorState {
  private _template: string = storyTemplate;
  private _title: string = "Template";
  private _selectedIssueType: string = defaultIssueTypes["Story"];

  constructor(title?: string, template?: string, selectedIssueType?: string) {
    if (template) {
      this.template = template;
    }
    if (title) {
      this.title = title;
    }
    if (selectedIssueType) {
      this.selectedIssueType = selectedIssueType;
    }
    makeAutoObservable(this);
  }
  public get template(): string {
    return this._template;
  }

  public set template(template: string) {
    this._template = template;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  get selectedIssueType() {
    return this._selectedIssueType;
  }

  public set selectedIssueType(x) {
    this._selectedIssueType = x;
  }

  get selectedIssueTypeName() {
    return Object.entries(defaultIssueTypes).find(
      ([, value]) => value === this._selectedIssueType
    )![0];
  }

  public serialize() {
    return {
      title: this.title,
      template: this.template,
      selectedIssueType: this.selectedIssueType,
    };
  }

  public static deserialize(obj: EditorState) {
    return new EditorState(obj.title, obj.template, obj.selectedIssueType);
  }
}
