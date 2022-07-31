import { makeAutoObservable } from "mobx";
import { storyTemplate } from "../data/defaultTemplate";

export class EditorState {
  private _template: string = storyTemplate;
  private _title: string = "Template";

  constructor(title?: string, template?: string) {
    if (template) {
      this.template = template;
    }
    if (title) {
      this.title = title;
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
  
  public serialize() {
    return {
      title: this.title,
      template: this.template
    }
  }
  
  public static deserialize(obj: EditorState) {
    return new EditorState(obj.title, obj.template);
  }
}
