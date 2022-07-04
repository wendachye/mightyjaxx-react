declare namespace User {
  export interface UserLoginResponse {
    accessToken: string;
    expiresIn: number;
  }

  export interface UserProfileResponse {
    createdAt: string;
    email: string;
    id: string;
    updatedAt: string;
    version: version;
  }
}
