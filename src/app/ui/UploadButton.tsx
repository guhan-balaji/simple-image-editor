import styles from "./imageEditor.module.css";

export default function UploadButton({
  onUpload,
}: {
  onUpload: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <button className={styles.btn}>
      <input
        type="file"
        accept="image/*"
        name="image"
        id="image"
        onChange={onUpload}
      />
    </button>
  );
}
