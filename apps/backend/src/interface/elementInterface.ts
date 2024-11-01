export interface ElementRequestBody {
  width: number;
  name: string;
  height: number;
  imageUrl: string;
}

export interface SpaceElementRequestBody {
  elementId: string;
  spaceId: string;
  x: number;
  y: number;
}
