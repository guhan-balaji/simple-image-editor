"use client";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text, Image as KonvaImage } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { ImageControls, TextControls } from "./ImageEditorControls";

// Type imports
import { Image } from "konva/lib/shapes/Image";
import { Stage as StageType } from "konva/lib/Stage";
import { ImageProperties, TextID, TextProperties } from "@/app/lib/ui/types";

// Styles
import styles from "./imageEditor.module.css";

export default function ImageEditor() {
  const [imageProperties, setImageProperties] = useState<ImageProperties>({
    brightness: 0,
    contrast: 0,
    height: 0,
    width: 0,
    url: "",
  });
  const [texts, setTexts] = useState<TextProperties[]>([]);
  const [text, setText] = useState<TextProperties>({
    id: "",
    text: "",
    x: 0,
    y: 0,
    fill: "",
  });
  const [selectedText, setSelectedText] = useState<TextID>("");

  const { brightness, contrast, height, width, url } = imageProperties;
  const [image] = useImage(url != null ? url : "");
  const stageRef = useRef<StageType>(null);
  const imageRef = useRef<Image>(null);

  useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current?.cache();
    }
  }, [image]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImageProperties({
        brightness: 0,
        contrast: 0,
        height: 600,
        width: 600,
        url: URL.createObjectURL(e.target.files[0]),
      });
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
    const newText = {
      id: crypto.randomUUID(),
      x: 0,
      y: 0,
      fill: "",
      text,
    } as TextProperties;
    setTexts([...texts, newText]);
  }

  function modifyText() {
    // TODO
  }

  return (
    <>
      <Stage
        className={`${styles.bg} ${styles.stage}`}
        width={height}
        height={width}
        ref={stageRef}
      >
        {image && (
          <Layer>
            {image && (
              <KonvaImage
                image={image}
                filters={[Konva.Filters.Brighten, Konva.Filters.Contrast]}
                brightness={brightness}
                contrast={contrast}
                width={width}
                height={height}
                ref={imageRef}
              />
            )}
            {texts.map((text) => (
              <Text
                key={text.id}
                text={text.text}
                x={text.x}
                y={text.y}
                fill={text.fill}
              />
            ))}
          </Layer>
        )}
      </Stage>
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
