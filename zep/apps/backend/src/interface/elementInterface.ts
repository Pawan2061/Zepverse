export interface User {
  username: string;
  id: string;
}
export interface addElementRequestBody {
  name: string;
  width: number;
  height: number;
  imageUrl: string;
}

export interface SpaceElementRequestBody {
  elementId: string;
  spaceId: string;
  x: number;
  y: number;
}

export interface UpdateElementRequestBody {
  imageUrl: string;
}
