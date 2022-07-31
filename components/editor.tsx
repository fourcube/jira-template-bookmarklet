import { observer } from "mobx-react";
import { ui, UiState } from "../state/ui.state";
import { Config } from "./config";
import styles from "./Editor.module.css";

export const Editor = observer((props: { ui: UiState }) => {
  const editor = props.ui.getActiveEditor();

  let view = (
    <div className={styles.editorWrapper}>
      <textarea
        className={`${styles.editor} ${styles.template}`}
        rows={30}
        value={editor?.template}
        onChange={(e) => {
          const editor = ui.getActiveEditor();
          if (editor) {
            editor.template = e.target.value;
          }
        }}
      ></textarea>
      {ui.editors.length > 1 && (
        <button onClick={() => ui.removeCurrentEditor()} className={styles.deleteTemplate}>delete</button>
      )}
    </div>
  );

  switch (ui.getActiveEditor()) {
    case null:
      view = (
        <div className={`${styles.editor}`}>
          <Config config={ui.config}></Config>
        </div>
      );

    case editor:
      view = view;
  }

  return view;
});
