export interface Userjoinpayload {
  type: string;
  payload: {
    spaceId: string;
    token: string;
  };
}

export interface JoinRequest {
  type: "join";
  payload: {
    spaceId: string;
    token: string;
  };
}

export interface JoinPayload {
  spaceId: string;
  token: string;
}
