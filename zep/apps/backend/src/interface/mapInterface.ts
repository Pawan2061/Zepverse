export interface DefaultElement {
  id: string;
  x: number;
  y: number;
}

export interface CreateMap extends Request {
  thumbnail: string;
  dimensions: string;
  name: string;
  defaultElements: DefaultElement[];
}
