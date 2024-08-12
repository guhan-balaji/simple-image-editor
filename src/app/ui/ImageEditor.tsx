"use client";
import { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import useImage from "use-image";
import Shape from "./Shape";
import { ImageControls, TextControls } from "./ImageEditorControls";

// Type imports
import { Image } from "konva/lib/shapes/Image";
import { Stage as StageType } from "konva/lib/Stage";
import { ImageProperties, ShapeID, TextProperties } from "@/app/lib/ui/types";

// Styles
import styles from "./imageEditor.module.css";
import { KonvaEventObject } from "konva/lib/Node";

export default function ImageEditor() {
  const [imageProperties, setImageProperties] = useState<ImageProperties>({
    shape: "image",
    id: "",
    brightness: 0,
    contrast: 0,
    height: 0,
    width: 0,
    url: "",
  });
  const [images, setImages] = useState<ImageProperties[]>([]);
  const [texts, setTexts] = useState<TextProperties[]>([]);
  const [text, setText] = useState<TextProperties>({
    shape: "text",
    id: "",
    text: "",
    fill: "",
    fontSize: 12,
  });
  const [selectedText, setSelectedText] = useState<ShapeID>("");

  const { brightness, contrast, height, width, url } = imageProperties;
  const [image] = useImage(url != null ? url : "");

  const [selectedShape, setSelectedShape] = useState<ShapeID>("");
  const stageRef = useRef<StageType>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImageProperties({
        shape: "image",
        id: crypto.randomUUID(),
        brightness: 0,
        contrast: 0,
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }
  function checkDeselect(e: KonvaEventObject<Event>) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape("");
    }
  }

  function handleImageControlChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const entries: { [key: string]: number } = {};
    for (const [k, v] of data.entries()) {
      entries[k] = parseFloat(v as string);
    }
    const modifiedImageProperties = entries as Partial<ImageProperties>;

    setImageProperties({
      ...imageProperties,
      ...modifiedImageProperties,
    });
  }

  function handleTextControlChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const entries: { [key: string]: string } = {};
    for (const [k, v] of data.entries()) {
      entries[k] = v as string;
    }

    if (entries.id === "") {
      addText(entries.text);
    } else {
      modifyText();
    }
  }

  function addText(text: string) {
    const newText: TextProperties = {
      shape: "text",
      id: crypto.randomUUID(),
      fill: "#000000",
      fontSize: 18,
      text,
    };
    setTexts([...texts, newText]);
  }

  function modifyText() {
    // TODO
  }

  return (
    <>
      <Stage
        className={`${styles.bg} ${styles.stage}`}
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {image && (
            <Shape
              // image={image}
              shapeProps={imageProperties}
              isSelected={selectedShape === imageProperties.id}
              onSelect={() => setSelectedShape(imageProperties.id)}
              onChange={(newAttrs) => {
                console.log(newAttrs);
                setImageProperties(newAttrs as ImageProperties);
              }}
            />
          )}
          {texts.map(
            (textProps, i) =>
               (
                <Shape
                  key={textProps.id}
                  shapeProps={textProps}
                  isSelected={selectedShape === textProps.id}
                  onSelect={() => setSelectedShape(textProps.id)}
                  onChange={(newAttrs) => {
                    console.log(newAttrs);

                    // const txts = texts.slice();
                    // txts[i] = newAttrs as TextProperties;
                    // setTexts(txts);
                  }}
                />
              )
          )}
        </Layer>
      </Stage>
      <>
        {image == null ? (
          <UploadButton onUpload={handleUpload} />
        ) : (
          <>
            <ImageControls onControlChange={handleImageControlChange} />
            <TextControls
              onControlChange={handleTextControlChange}
              textProperties={text}
            />
          </>
        )}
      </>
    </>
  );
}

function UploadButton({
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
