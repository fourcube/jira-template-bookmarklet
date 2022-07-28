import { makeAutoObservable } from "mobx";

export class ConfigState {
  _jiraBaseUrl = "https://jira.porsche.codes";
  _projectId = "13400";
  _issueType = "10001";

  constructor() {
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
}
