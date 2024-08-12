import { useRef } from "react";

export default function Toolbar({
  onAddShape,
}: {
  onAddShape: React.ReactEventHandler;
}) {
  return (
    <div>
      <AddImage onAddShape={onAddShape} />
      <AddText onAddShape={onAddShape} />
    </div>
  );
}

function AddImage({ onAddShape }: { onAddShape: React.ReactEventHandler }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button onClick={(_) => ref.current!.click()}>
      Add Image +
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
        Add Text +
      </button>
    </>
  );
}
