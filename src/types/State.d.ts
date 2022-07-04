declare namespace State {
  export interface UserProfile {
    createdAt: string;
    email: string;
    id: string;
    updatedAt: string;
  }

  export interface User {
    accessToken: {
      accessToken: string;
      expiresIn: number;
    } | null;
    error: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    user: UserProfile | null;
  }

  export interface UserLoginTiggerPayload {
    email?: string;
    password?: string;
  }

  export interface UserLoginSuccessPayload {
    accessToken?: {
      accessToken: string;
      expiresIn: number;
    };
    user?: UserProfile;
  }

  export interface ErrorPayload {
    error: string;
  }

  export interface ProductDetails {
    createdAt: Date;
    createdBy: string;
    id: string;
    imageURL: string;
    sku: string;
    title: string;
    updatedAt: Date;
    updatedBy: string;
    version: number;
  }

  export interface Product {
    error: string | null;
    loading: boolean;
    product: ProductDetails | null;
    products: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      limit: number;
      page: number;
      records: ProductDetails[];
      totalCount: number;
      totalPages: number;
    } | null;
  }
}
