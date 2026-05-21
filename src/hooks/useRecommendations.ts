import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { RecommendationResponse, RecommendedProduct } from '../types';
import { products } from '../data/products';

export function useRecommendations() {
  const mutation = useMutation({
    mutationFn: async (query: string) => {
      const response = await axios.post<RecommendationResponse>('/api/recommend', { query });
      
      // The API returns { recommendations: [{ productId, reason }] }
      // We map the product ID back to the rich product data on the client side
      // Alternatively, the server could do this, but doing it here saves bandwidth
      const richRecommendations: RecommendedProduct[] = response.data.recommendations.map(rec => {
        const product = products.find(p => p.id === rec.productId);
        if (!product) {
          throw new Error(`Product ${rec.productId} not found in catalog.`);
        }
        return {
          product,
          reason: rec.reason
        };
      });

      return richRecommendations;
    }
  });

  return {
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error,
    mutate: mutation.mutate
  };
}
