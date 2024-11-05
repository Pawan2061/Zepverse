export interface DefaultElement {
  elementId: string;
  x: number;
  y: number;
}

export interface CreateMap extends Request {
  thumbnail: string;
  dimensions: string;
  name: string;
  defaultElements: DefaultElement[];
}

export interface CreateAvatar extends Request {
  imageUrl: string;
  name: string;
}
