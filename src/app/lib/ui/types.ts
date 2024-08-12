export type ShapeID = string;

type BaseShapeProperties = {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
};
export type TextProperties = BaseShapeProperties & {
  id: ShapeID;
  text: string;
  fontSize: number;
  fill: string;
};

export type ImageProperties = BaseShapeProperties & {
  id: ShapeID;
  // height: number;
  // width: number;
  brightness: number;
  contrast: number;
  url: string;
};

export type ShapeProperties = TextProperties | ImageProperties;
