"use client";
import { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import Shape from "./Shape";
import Controls from "./Controls";

// Type imports
import { Stage as StageType } from "konva/lib/Stage";
import {
  ImageProperties,
  TextProperties,
  ShapeProperties,
} from "@/app/lib/ui/types";

// Styles
import styles from "./imageEditor.module.css";
import { KonvaEventObject } from "konva/lib/Node";
import ToolBar from "./ToolBar";

export default function ImageEditor() {
  const [images, setImages] = useState<ImageProperties[]>([]);
  const [texts, setTexts] = useState<TextProperties[]>([]);

  const [selectedShape, setSelectedShape] = useState<ShapeProperties | null>(
    null
  );
  const stageRef = useRef<StageType>(null);

  function checkDeselect(e: KonvaEventObject<Event>) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape(null);
    }
  }

  function handleAddShape(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    console.log(e.currentTarget.name);
    switch (e.currentTarget.name) {
      case "text":
        const newText: TextProperties = {
          shape: "text",
          id: crypto.randomUUID(),
          fill: "#000000",
          fontSize: 18,
          text: "Click me.",
        };
        setTexts([...texts, newText]);
        break;
      case "image":
        const files = (e.target as HTMLInputElement).files;
        if (files && files[0]) {
          const imgProps: ImageProperties = {
            shape: "image",
            id: crypto.randomUUID(),
            brightness: 0,
            contrast: 0,
            url: URL.createObjectURL(files[0]),
          };
          setImages([...images, imgProps]);
        }
        break;
      default:
        console.error("Unkown Shape: Tried to add an unkown shape.");
        break;
    }
  }

  function handleControlChange(newAttrs: Partial<ShapeProperties>) {
    if (newAttrs.shape === "image") {
 
      setImages((images) =>
        images.map((image) => {
          if (image.id === selectedShape?.id) {
            return {
              ...image,
              ...newAttrs,
            };
          } else {
            return {
              ...image,
            };
          }
        })
      );
    } else if (newAttrs.shape === "text") {

      setTexts((texts) =>
        texts.map((text) => {
          if (text.id === selectedShape?.id) {
            console.log(text);

            return {
              ...text,
              ...newAttrs,
            };
          } else {
            return {
              ...text,
            };
          }
        })
      );
    } else {
      console.error("Unknown Shape: Tried to update unkown shape.");
    }
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
          {images.map((imageProps, i) => (
            <Shape
              key={imageProps.id}
              shapeProps={imageProps}
              isSelected={selectedShape?.id === imageProps.id}
              onSelect={() => setSelectedShape({ ...imageProps })}
              onChange={(newAttrs) => {
                console.log(newAttrs);

                const imgs = images.slice();
                imgs[i] = newAttrs as ImageProperties;
                setImages(imgs);
              }}
            />
          ))}
          {texts.map((textProps, i) => (
            <Shape
              key={textProps.id}
              shapeProps={textProps}
              isSelected={selectedShape?.id === textProps.id}
              onSelect={() => setSelectedShape({ ...textProps })}
              onChange={(newAttrs) => {
                console.log(newAttrs);

                const txts = texts.slice();
                txts[i] = newAttrs as TextProperties;
                setTexts(txts);
              }}
            />
          ))}
        </Layer>
      </Stage>
      <>
        <ToolBar onAddShape={handleAddShape} />
      </>
      {selectedShape != null && (
        <Controls
          selectedShape={selectedShape}
          onControlChange={handleControlChange}
        />
      )}
    </>
  );
}
