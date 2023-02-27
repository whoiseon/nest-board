export interface LoginPayload {
  id: number;
  username: string;
}

export interface LoginResponse {
  payload: LoginPayload;
  accessToken: string;
}
