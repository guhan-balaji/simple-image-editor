import styles from "@/app/ui/imageEditor.module.css";

export default function ImageEditorControls() {
  return (
    <form className={styles.controlsContainer}>
      <div className={styles.controlsOptionsContainer}>
        <label htmlFor="brightness">Brightness:</label>
        <input id="brightness" type="range" min="-80" max="80" step="1" />
      </div>
      <div className={styles.controlsOptionsContainer}>
        <label htmlFor="contrast">Contrast:</label>
        <input id="contrast" type="range" min="-1" max="1" step="0.01" />
      </div>
    </form>
  );
}
