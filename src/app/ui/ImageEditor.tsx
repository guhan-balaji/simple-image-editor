"use client";
import ImageEditorControls from "./ImageEditorControls";
import { LegacyRef, ReactElement, useEffect, useRef, useState } from "react";
import { ImageProperties } from "@/app/lib/ui/types";
import { Stage, Layer, Text, Image as KonvaImage } from "react-konva";
import Konva from "konva";
import useImage from "use-image";

import UploadButton from "./UploadButton";

import styles from "./imageEditor.module.css";
import { Image } from "konva/lib/shapes/Image";
import { Stage as StageType } from "konva/lib/Stage";

export default function ImageEditor() {
  const [imageProperties, setImageProperties] = useState<ImageProperties>({
    brightness: 0,
    contrast: 0,
    height: 0,
    width: 0,
    url: "",
  });
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
            {/* {texts.map((text) => (
              <Text
                key={text.id}
                text={text.text}
                x={text.x}
                y={text.y}
                fontFamily={text.font}
                fill={text.fill}
                fontSize={24}
                draggable
                onDragEnd={(e) => handleTextDrag(e, text.id)}
              />
            ))} */}
          </Layer>
        )}
      </Stage>
      {image == null ? (
        <UploadButton onUpload={handleUpload} />
      ) : (
        <ImageEditorControls />
      )}
    </>
  );
}
