import { useRef } from "react";
import styles from "./imageEditor.module.css";

export default function Toolbar({
  isShapeSelected,
  onAddShape,
  onDeleteShape,
}: {
  isShapeSelected: boolean;
  onAddShape: React.ReactEventHandler;
  onDeleteShape: React.ReactEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className={styles.toolbar}>
      <div>
        <AddImage onAddShape={onAddShape} />
        <AddText onAddShape={onAddShape} />
        <DeleteShape
          isShapeSelected={isShapeSelected}
          onDeleteShape={onDeleteShape}
        />
      </div>
    </div>
  );
}

function AddImage({ onAddShape }: { onAddShape: React.ReactEventHandler }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button onClick={(_) => ref.current!.click()} className={styles.btn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        <path
          d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0
        0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0
        0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z"
        />
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
      <button type="button" onClick={onAddShape} name="text" className={styles.btn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783
          2.693-1.845l.424-.013v7.827c0
          .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062
          2.434.301 2.693 1.846h.479z"
          />
        </svg>
      </button>
    </>
  );
}

function DeleteShape({
  isShapeSelected,
  onDeleteShape,
}: {
  isShapeSelected: boolean;
  onDeleteShape: React.ReactEventHandler<HTMLButtonElement>;
}) {
  return (
    <button disabled={!isShapeSelected} onClick={onDeleteShape} className={styles.btn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5
        0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1
        0v6a.5.5 0 0 0 1 0z"
        />
        <path
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0
        1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1
        1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0
        1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
        />
      </svg>
    </button>
  );
}
