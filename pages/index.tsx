import { autorun } from "mobx";
import { observer } from "mobx-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import ConditionallyRender from "../components/conditionally-render";
import { Editor } from "../components/editor";
import { Navigation } from "../components/navigation";
import { createIssueURL } from "../lib/jira";
import { ui, UiState } from "../state/ui.state";
import styles from "../styles/Home.module.css";

const App = observer((_: { ui: UiState }) => {
  const activeEditor = ui.getActiveEditor();

  useEffect(() =>
    autorun(() => {
      localStorage.setItem(
        "jira-template-state",
        JSON.stringify(ui.serialize())
      );
    })
  );

  return (
    <main suppressHydrationWarning className={styles.main}>
      <div className={styles.container}>
        <p className={styles.p}>
          Create Jira issues with a description template.
        </p>

        <ConditionallyRender client>
          <div className={styles.templateEditor}>
            <Navigation ui={ui}></Navigation>

            <Editor ui={ui}></Editor>

            <div className={styles.buttonWrapper}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.button} ${
                  !ui.config.jiraBaseUrl || !activeEditor ? styles.disabled : ""
                }`}
                href={createIssueURL(
                  ui.config.jiraBaseUrl,
                  activeEditor?.template || "",
                  ui.config.projectId,
                  activeEditor?.selectedIssueType || ""
                )}
              >
                Create {activeEditor?.selectedIssueTypeName}
              </a>

              <select
                disabled={!ui.config.jiraBaseUrl || !activeEditor}
                value={activeEditor?.selectedIssueType}
                onChange={(e) =>
                  (activeEditor!.selectedIssueType = e.target.value)
                }
              >
                {Object.entries(ui.config.issueTypes).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </ConditionallyRender>
      </div>
    </main>
  );
});

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jira Templates Bookmarklet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App ui={ui}></App>
    </div>
  );
};

export default Home;
