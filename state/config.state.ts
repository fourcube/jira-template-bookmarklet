import { makeAutoObservable } from "mobx";

export const defaultIssueTypes = {
  Story: "10001",
  Task: "10002",
  Bug: "10100",
};
export class ConfigState {
  _jiraBaseUrl = "https://jira.porsche.codes";
  _projectId = "13400";
  _issueTypes: { [key: string]: string } = defaultIssueTypes;

  // TODO: remove defaults
  constructor(
    jiraBaseUrl: string = "https://jira.porsche.codes",
    projectId: string = "13400",
    issueTypes: { [key: string]: string } = defaultIssueTypes
  ) {
    this.jiraBaseUrl = jiraBaseUrl;
    this.projectId = projectId;
    this._issueTypes = issueTypes;

    makeAutoObservable(this);
  }

  get jiraBaseUrl() {
    return this._jiraBaseUrl;
  }

  get projectId() {
    return this._projectId;
  }

  get issueTypes() {
    return this._issueTypes;
  }

  set jiraBaseUrl(x) {
    this._jiraBaseUrl = x;
  }

  set projectId(x) {
    this._projectId = x;
  }

  public static deserialize(obj: ConfigState): ConfigState {
    return new ConfigState(obj.jiraBaseUrl, obj.projectId, obj.issueTypes);
  }

  public serialize() {
    return {
      jiraBaseUrl: this.jiraBaseUrl,
      projectId: this.projectId,
      issueTypes: this.issueTypes,
    };
  }
}
