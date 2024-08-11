import styles from "@/app/ui/imageEditor.module.css";
import { useRef } from "react";

export default function ImageEditorControls({
  onControlChange,
}: {
  onControlChange: React.FormEventHandler;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
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
  );
}
