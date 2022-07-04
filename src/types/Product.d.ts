declare namespace Product {
  export interface ProductListResponse {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
    page: number;
    records: {
      createdAt: Date;
      createdBy: string;
      id: string;
      imageURL: string;
      sku: string;
      title: string;
      updatedAt: Date;
      updatedBy: string;
      version: number;
    }[];
    totalCount: number;
    totalPages: number;
  }

  export interface ProductDetailsResponse {
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

  export interface ProductCreateRequest {
    sku: string;
    title: string;
  }

  export interface ProductCreateResponse {
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

  export interface ProductUpdateRequest {
    sku?: string;
    title?: string;
  }

  export interface ProductUpdateResponse {
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
}
