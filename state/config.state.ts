import { makeAutoObservable } from "mobx";

export class ConfigState {
  _jiraBaseUrl = "https://jira.porsche.codes";
  _projectId = "13400";
  _issueType = "10001";

  // TODO: remove defaults
  constructor(
    jiraBaseUrl: string = "https://jira.porsche.codes",
    projectId: string = "13400",
    issueType: string = "10001"
  ) {
    this.jiraBaseUrl = jiraBaseUrl;
    this.projectId = projectId;
    this.issueType = issueType;

    makeAutoObservable(this);
  }

  get jiraBaseUrl() {
    return this._jiraBaseUrl;
  }

  get projectId() {
    return this._projectId;
  }

  get issueType() {
    return this._issueType;
  }

  set jiraBaseUrl(x) {
    this._jiraBaseUrl = x;
  }

  set projectId(x) {
    this._projectId = x;
  }

  set issueType(x) {
    this._issueType = x;
  }

  public static deserialize(obj: ConfigState): ConfigState {
    return new ConfigState(obj.jiraBaseUrl, obj.projectId, obj.issueType);
  }

  public serialize() {
    return {
      jiraBaseUrl: this.jiraBaseUrl,
      projectId: this.projectId,
      issueType: this.issueType,
    };
  }
}
