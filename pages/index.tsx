import type { NextPage } from "next";
import Head from "next/head";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { defaultTemplate } from "../data/defaultTemplate";
import { createBookmarklet, createBookmarkletHacky } from "../lib/bookmarklet";
import styles from "../styles/Home.module.css";

enum ButtonTexts {
  COPIED = "Copied!",
  INITIAL = "Copy Bookmarklet",
  INITIAL_HACKY = "Copy Bookmarklet (hacky)",
}

const Home: NextPage = () => {
  const timeoutRef = useRef<any>();
  const [buttonText, setButtonText] = useState(ButtonTexts.INITIAL);
  const [hackyButtonText, setHackyButtonText] = useState(
    ButtonTexts.INITIAL_HACKY
  );
  const [template, setTemplate] = useState(defaultTemplate);

  function toggleButton(
    bookmarkletFn: (x: string) => string,
    setTextFn: Dispatch<SetStateAction<ButtonTexts>>,
    initialText: ButtonTexts
  ) {
    return () => {
      navigator.clipboard.writeText(bookmarkletFn(template)).then(
        function () {
          setTextFn(ButtonTexts.COPIED);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            setTextFn(initialText);
          }, 1000);
        },
        function (err) {
          console.error("Failed to copy!", err);
        }
      );
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Jira Templates Bookmarklet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.p}>
            Create a bookmarklet that pastes the following template into the
            issue description in Jira.
          </p>

          <div className={styles.templateEditor}>
            <ul className={styles.tabs}>
              <li className={styles.tab}>Template</li>
            </ul>
            <textarea
              className={styles.template}
              rows={30}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            ></textarea>

            <div className={styles.buttonWrapper}>
              <button
                onClick={toggleButton(
                  createBookmarklet,
                  setButtonText,
                  ButtonTexts.INITIAL
                )}
                className={styles.button}
              >
                {buttonText}
              </button>
              <button
                onClick={toggleButton(
                  createBookmarkletHacky,
                  setHackyButtonText,
                  ButtonTexts.INITIAL_HACKY
                )}
                className={styles.button}
              >
                {hackyButtonText}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
