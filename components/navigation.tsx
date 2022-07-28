import { observer } from "mobx-react";
import React, { Component } from "react";
import { ActiveView, ui, UiState } from "../state/ui.state";
import styles from "./Navigation.module.css";

const Tab = observer(
  (
    props: {
      ui: UiState;
      id: ActiveView;
      className?: string;
    } & React.PropsWithChildren
  ) => {
    return (
      <li
        className={`${styles.tab} ${props.className} ${
          props.ui.activeView === props.id ? styles.isActive : null
        }`}
        onClick={() => (ui.activeView = props.id)}
      >
        {props.children}
      </li>
    );
  }
);
export const Navigation = observer((props: { ui: UiState }) => {
  const tabs = [
    ...props.ui.editors.map((_, index) => {
      return (
        <Tab key={index} ui={ui} id={index}>
          Template
        </Tab>
      );
    }),
    <Tab key={"config"} ui={ui} id={"config"} className={styles.isConfig}>
      ⚙️
    </Tab>,
  ];
  return <ul className={styles.tabs}>{tabs}</ul>;
});
