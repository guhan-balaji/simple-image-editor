import { useRef, useState } from "react";
// import styles from "./imageEditor.module.css";
import {
  ImageProperties,
  Shape,
  ShapeID,
  ShapeProperties,
  TextProperties,
} from "../lib/ui/types";

export default function Controls({
  selectedShape,
  onControlChange,
}: {
  selectedShape: ShapeProperties | null;
  onControlChange: (newAttrs: ShapeProperties) => void;
}) {
  return (
    <>
      {selectedShape && selectedShape.shape === "image" && (
        <ImageControls
          imageProperties={selectedShape as ImageProperties}
          onControlChange={onControlChange}
        />
      )}
      {selectedShape && selectedShape.shape === "text" && (
        <TextControls
          textProperties={selectedShape as TextProperties}
          onControlChange={onControlChange}
        />
      )}
    </>
  );
}

function ImageControls({
  imageProperties,
  onControlChange,
}: {
  imageProperties: ImageProperties;
  onControlChange: (newAttrs: ShapeProperties) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <h2>Image Controls</h2>
      <div>
        <label htmlFor="brightness">Brightness:</label>
        <br />
        <input
          onChange={(e) =>
            onControlChange({
              ...imageProperties,
              brightness: parseFloat(e.target.value),
            })
          }
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
          onChange={(e) =>
            onControlChange({
              ...imageProperties,
              contrast: parseFloat(e.target.value),
            })
          }
        />
      </div>
    </>
  );
}

function TextControls({
  textProperties,
  onControlChange,
}: {
  textProperties: TextProperties;
  onControlChange: (newAttrs: ShapeProperties) => void;
}) {
  // const [text, setText] = useState<string>(textProperties.text);
  return (
    <>
      <h2>Text Controls</h2>
      <div>
        <input type="hidden" name="id" value={textProperties.id} />
        <label htmlFor="text">Text:</label>
        <br />
        <input
          name="text"
          type="text"
          defaultValue={textProperties.text}
          onChange={(e) => {
            // setText(e.target.value);
            onControlChange({
              ...textProperties,
              text: e.target.value,
            });
          }}
        />
        <label htmlFor="fill">Text Color:</label>
        <br />
        <input
          name="fill"
          type="color"
          defaultValue={textProperties.text}
          onChange={(e) =>
            onControlChange({
              ...textProperties,
              fill: e.target.value,
            })
          }
        />
      </div>
    </>
  );
}
