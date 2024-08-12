import { useRef, useState } from "react";
// import styles from "./imageEditor.module.css";
import { TextProperties } from "../lib/ui/types";

export function ImageControls({
  onControlChange,
}: {
  onControlChange: React.FormEventHandler;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <h2>Image Controls</h2>
      <form onSubmit={onControlChange}>
        <label htmlFor="brightness">Brightness:</label>
        <br />
        <input
          onChange={(_) => btnRef.current?.click()}
          name="brightness"
          type="range"
          min="-1"
          max="1"
          step="0.01"
        />
        <br />
        <label htmlFor="contrast">Contrast:</label>
        <br />
        <input
          name="contrast"
          type="range"
          min="-50"
          max="50"
          step="1"
          onChange={(_) => btnRef.current?.click()}
        />
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
      <form onSubmit={onControlChange}>
        <input type="hidden" name="id" value={textProperties.id} />
        {textProperties.id === "" ? (
          <>
            <label htmlFor="text">Add Text:</label>
            <br />
            <input
              name="text"
              type="text"
              value={text}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setText("");
                  btnRef.current?.click();
                }
              }}
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
          </>
        ) : (
          <>
            <label htmlFor="fill">Text Color:</label>
            <br />
            <input
              name="fill"
              type="color"
              onChange={(_) => btnRef.current?.click()}
            />
          </>
        )}
        <button type="submit" ref={btnRef} hidden aria-hidden="true"></button>
      </form>
    </>
  );
}
