export type ImageProperties = {
  height: number;
  width: number;
  brightness: number;
  contrast: number;
  url: string;
};

export type TextProperties = {
  id: TextID;
  text: string;
  x: number;
  y: number;
  fill: string;
};

export type TextID = string;