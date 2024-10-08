import { useState } from "react";
import {
  ImageProperties,
  ShapeProperties,
  TextProperties,
} from "../lib/ui/types";

import styles from "./imageEditor.module.css";

export default function Controls({
  selectedShape,
  onControlChange,
}: {
  selectedShape: ShapeProperties;
  onControlChange: (newAttrs: Partial<ShapeProperties>) => void;
}) {
  return (
    <div className={styles.controlPanel}>
      <div className={styles.columnContainer}>
        {selectedShape.shape === "image" && (
          <ImageControls
            imageProperties={selectedShape as ImageProperties}
            onControlChange={onControlChange}
          />
        )}
        {selectedShape.shape === "text" && (
          <TextControls
            textProperties={selectedShape as TextProperties}
            onControlChange={onControlChange}
          />
        )}
      </div>
    </div>
  );
}

function ImageControls({
  imageProperties,
  onControlChange,
}: {
  imageProperties: ImageProperties;
  onControlChange: (newAttrs: Partial<ShapeProperties>) => void;
}) {
  return (
    <>
      <h2>Image Controls</h2>
      <label htmlFor="brightness">Brightness:</label>
      <br />
      <input
        onChange={(e) =>
          onControlChange({
            shape: imageProperties.shape,
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
            shape: imageProperties.shape,
            contrast: parseFloat(e.target.value),
          })
        }
      />
    </>
  );
}

function TextControls({
  textProperties,
  onControlChange,
}: {
  textProperties: TextProperties;
  onControlChange: (newAttrs: Partial<ShapeProperties>) => void;
}) {
  const webSafeFonts = [
    "Arial",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
    "Trebuchet MS",
    "Palatino Linotype",
    "Tahoma",
    "Lucida Console",
    "Comic Sans MS",
  ];

  return (
    <>
      <h2>Text Controls</h2>
      <input type="hidden" name="id" value={textProperties.id} />
      <label htmlFor="text">Text:</label>
      <br />
      <input
        name="text"
        type="text"
        defaultValue={textProperties.text}
        onChange={(e) => {
          onControlChange({
            shape: textProperties.shape,
            text: e.target.value,
          });
        }}
      />
      <br />
      <label htmlFor="fill">Text Color:</label>
      <br />
      <input
        name="fill"
        type="color"
        defaultValue={textProperties.fill}
        onChange={(e) =>
          onControlChange({
            shape: textProperties.shape,
            fill: e.target.value,
          })
        }
      />
      <br />
      <label htmlFor="fontFamily">Choose a font: </label>
      <select
        id="fontStyle"
        defaultValue={textProperties.fontFamily}
        onChange={(e) => {
          onControlChange({
            shape: textProperties.shape,
            fontFamily: e.target.value,
          });
        }}
      >
        {webSafeFonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </>
  );
}
