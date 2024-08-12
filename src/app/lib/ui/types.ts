export type ShapeID = string;

export type Shape = "image" | "text";

type BaseShapeProperties = {
  shape: Shape;
  height?: number;
  width?: number;
  x?: number;
  y?: number;
};
export type TextProperties = BaseShapeProperties & {
  shape: "text";
  id: ShapeID;
  text: string;
  fontSize: number;
  fill: string;
};

export type ImageProperties = BaseShapeProperties & {
  shape: "image";
  id: ShapeID;
  brightness: number;
  contrast: number;
  url: string;
};

export type ShapeProperties = TextProperties | ImageProperties;
