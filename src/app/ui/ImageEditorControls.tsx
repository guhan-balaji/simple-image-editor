import { useRef, useState } from "react";
import styles from "./imageEditor.module.css";
import { TextID, TextProperties } from "../lib/ui/types";

export function ImageControls({
  onControlChange,
}: {
  onControlChange: React.FormEventHandler;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <h2>Image Controls</h2>
      <form className={styles.controlsContainer} onSubmit={onControlChange}>
        <div className={styles.controlsOptionsContainer}>
          <label htmlFor="brightness">Brightness:</label>
          <input
            onChange={(_) => btnRef.current?.click()}
            name="brightness"
            type="range"
            min="-1"
            max="1"
            step="0.01"
          />
        </div>
        <div className={styles.controlsOptionsContainer}>
          <label htmlFor="contrast">Contrast:</label>
          <input
            name="contrast"
            type="range"
            min="-50"
            max="50"
            step="1"
            onChange={(_) => btnRef.current?.click()}
          />
        </div>
        <button type="submit" ref={btnRef} hidden aria-hidden="true"></button>
      </form>
    </>
  );
}

export function TextControls({
  textProperties,
  onControlChange,
}: {
  textProperties: TextProperties;
  onControlChange: React.FormEventHandler;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [text, setText] = useState<string>("");

  return (
    <>
      <h2>Text Controls</h2>
      <form className={styles.controlsContainer} onSubmit={onControlChange}>
        <input type="hidden" name="id" value={textProperties.id} />
        {textProperties.id === "" ? (
          <div className={styles.controlsOptionsContainer}>
            <label htmlFor="text">Add Text</label>
            <input
              name="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="button"
              onClick={(_) => {
                setText("");
                btnRef.current?.click();
              }}
            >
              +
            </button>
          </div>
        ) : (
          <div className={styles.controlsOptionsContainer}>
            <label htmlFor="fill">Text Color:</label>
            <input
              name="fill"
              type="color"
              onChange={(_) => btnRef.current?.click()}
            />
          </div>
        )}
        <button type="submit" ref={btnRef} hidden aria-hidden="true"></button>
      </form>
    </>
  );
}
