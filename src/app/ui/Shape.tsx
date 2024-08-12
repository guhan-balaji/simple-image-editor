import { LegacyRef, useEffect, useRef } from "react";
import {
  Image as KonvaImage,
  Text as KonvaText,
  Transformer,
} from "react-konva";

import { ImageProperties, ShapeProperties } from "../lib/ui/types";
import { Transformer as T } from "konva/lib/shapes/Transformer";
import { Text } from "konva/lib/shapes/Text";
import { Image } from "konva/lib/shapes/Image";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

export default function Shape(props: {
  shape: "image" | "text";
  shapeProps: ShapeProperties;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ShapeProperties) => void;
  image?: CanvasImageSource;
  imageRef?: LegacyRef<Image>;
}) {
  const shapeRef = useRef<Image | Text>(null);
  const trRef = useRef<T>(null);

  useEffect(() => {
    if (props.isSelected && shapeRef.current != null) {
      // we need to attach transformer manually
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [props.isSelected]);

  useEffect(() => {
    if (props.image != null) {
      const imageProps = props.shapeProps as ImageProperties;
      console.log("shape effect: ", imageProps);

      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      shapeRef.current?.cache();
    }
  }, [props.image, props.shapeProps]);

  function onDragEnd(e: KonvaEventObject<DragEvent>) {
    props.onChange({
      ...props.shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  }

  function onTransformEnd(e: KonvaEventObject<Event>) {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = shapeRef.current!;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);
    props.onChange({
      ...props.shapeProps,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
    });
  }

  return (
    <>
      {props.shape === "image" && props.image != null ? (
        <KonvaImage
          key={props.shapeProps.id}
          image={props.image}
          filters={[Konva.Filters.Brighten, Konva.Filters.Contrast]}
          onClick={props.onSelect}
          onTap={props.onSelect}
          ref={shapeRef as LegacyRef<Image>}
          {...props.shapeProps}
          draggable
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
        />
      ) : (
        <KonvaText
          key={props.shapeProps.id}
          onClick={props.onSelect}
          onTap={props.onSelect}
          {...props.shapeProps}
          draggable
          onDragEnd={onDragEnd}
          onTransform={onTransformEnd}
          ref={shapeRef as LegacyRef<Text>}
        />
      )}
      {props.isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          // boundBoxFunc={(oldBox, newBox) => {
          //   // limit resize
          //   if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
          //     return oldBox;
          //   }
          //   return newBox;
          // }}
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
