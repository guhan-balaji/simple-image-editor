import { useRef } from "react";
import styles from "./imageEditor.module.css";
console.log(styles);

export default function Toolbar({
  onAddShape,
}: {
  onAddShape: React.ReactEventHandler;
}) {
  return (
    <div className={styles.toolbar}>
      <AddImage onAddShape={onAddShape} />
      <AddText onAddShape={onAddShape} />
    </div>
  );
}

function AddImage({ onAddShape }: { onAddShape: React.ReactEventHandler }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button onClick={(_) => ref.current!.click()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        // fill="currentColor"
        // class="bi bi-file-image"
        viewBox="0 0 16 16"
      >
        <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z" />
      </svg>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        name="image"
        onChange={onAddShape}
        hidden
      />
    </button>
  );
}

function AddText({ onAddShape }: { onAddShape: React.ReactEventHandler }) {
  return (
    <>
      <button type="button" onClick={onAddShape} name="text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          // fill="currentColor"
          // class="bi bi-fonts"
          viewBox="0 0 16 16"
        >
          <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479z" />
        </svg>
      </button>
    </>
  );
}
