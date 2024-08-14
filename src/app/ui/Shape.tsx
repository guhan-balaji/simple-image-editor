import { LegacyRef, useEffect, useRef } from "react";
import {
  Image as KonvaImage,
  Text as KonvaText,
  Transformer,
} from "react-konva";

import { ShapeProperties } from "../lib/ui/types";
import { Transformer as T } from "konva/lib/shapes/Transformer";
import { Text } from "konva/lib/shapes/Text";
import { Image } from "konva/lib/shapes/Image";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import useImage from "use-image";

export default function Shape({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: {
  shapeProps: ShapeProperties;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ShapeProperties) => void;
}) {
  const shapeRef = useRef<Image | Text>(null);
  const trRef = useRef<T>(null);
  const [image] = useImage(shapeProps.shape === "image" ? shapeProps.url : "");

  useEffect(() => {
    if (isSelected && shapeRef.current != null) {
      // we need to attach transformer manually
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    if (image != null && shapeProps.shape === "image") {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      shapeRef.current?.cache();
    }
  }, [image, shapeProps]);

  function onDragEnd(e: KonvaEventObject<DragEvent>) {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  }

  function onTransformEnd(e: KonvaEventObject<Event>) {
    const node = shapeRef.current!;
    if (shapeProps.shape === "image") {
      onChange({
        ...shapeProps,
        x: node.x(),
        y: node.y(),
        width: node.width(),
        height: node.height(),
      });
    } else {
      onChange({
        ...shapeProps,
        x: node.x(),
        y: node.y(),
      });
    }
  }

  return (
    <>
      {shapeProps.shape === "image" && image != null ? (
        <KonvaImage
          key={shapeProps.id}
          image={image}
          filters={[Konva.Filters.Brighten, Konva.Filters.Contrast]}
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef as LegacyRef<Image>}
          {...shapeProps}
          draggable
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
        />
      ) : (
        <KonvaText
          key={shapeProps.id}
          onClick={onSelect}
          onTap={onSelect}
          {...shapeProps}
          draggable
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
          ref={shapeRef as LegacyRef<Text>}
        />
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          keepRatio
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
        />
      )}
    </>
  );
}
