import { observer } from "mobx-react";
import React, { Component, useState } from "react";
import { EditorState } from "../state/editor.state";
import { ActiveView, ui, UiState } from "../state/ui.state";
import { Editor } from "./editor";
import styles from "./Navigation.module.css";

const Tab = observer(
  (props: {
    ui: UiState;
    id: ActiveView;
    title: string;
    className?: string;
    editable?: boolean;
    editor?: EditorState;
  }) => {
    const [editing, setEditing] = useState(false);

    return (
      <li
        className={`${styles.tab} ${props.className} ${
          props.ui.activeView === props.id ? styles.isActive : null
        }`}
        onClick={() => (ui.activeView = props.id)}
        onDoubleClick={() => {
          if (props.editable) setEditing(true);
        }}
      >
        {editing ? (
          <input
            value={props.title}
            onChange={(e) => {
              props.editor!.title = e.target.value;
            }}
            autoFocus
            className={styles.tabEdit}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditing(false);
            }}
          ></input>
        ) : (
          props.title
        )}
      </li>
    );
  }
);
export const Navigation = observer((props: { ui: UiState }) => {
  const tabs = [
    ...props.ui.editors.map((editor, index) => {
      return (
        <Tab
          key={index}
          ui={ui}
          id={index}
          title={editor.title}
          editor={editor}
          editable={true}
        ></Tab>
      );
    }),
    <li key="add" className={styles.addTab}>
      {ui.editors.length < 10 && (
        <button onClick={() => ui.createEditor()}>+</button>
      )}
    </li>,
  ];
  return (
    <div className={styles.tabContainer}>
      <div className={styles.scrollableTabs}>
        <ul className={styles.tabs}>{tabs}</ul>
      </div>
      <ul className={styles.tabs}>
        <Tab
          key={"config"}
          ui={ui}
          id={"config"}
          title="⚙️"
          className={styles.isConfig}
        ></Tab>
      </ul>
    </div>
  );
});
