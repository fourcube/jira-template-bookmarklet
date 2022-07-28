import { observer } from "mobx-react";
import { ConfigState } from "../state/config.state";

import styles from './Config.module.css';
export const Config = observer((props: { config: ConfigState }) => {
  return (
    <div className={styles.config}>
      <form>
        <label>
          Jira Base URL:
          <input
            value={props.config.jiraBaseUrl}
            onChange={(e) => (props.config.jiraBaseUrl = e.target.value)}
          ></input>
        </label>

        <label>
          Project ID:
          <input
            value={props.config.projectId}
            onChange={(e) => (props.config.projectId = e.target.value)}
          ></input>
        </label>
      </form>
    </div>
  );
});
