export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  tags: string[];
  image: string;
  shortDescription: string;
}

export interface RecommendationResponse {
  recommendations: {
    productId: string;
    reason: string;
  }[];
}

export interface RecommendedProduct {
  product: Product;
  reason: string;
}
