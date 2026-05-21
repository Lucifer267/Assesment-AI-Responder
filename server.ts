import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { OpenAI } from 'openai';
import { products } from './src/data/products';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "sk-abcd1234efgh5678abcd1234efgh5678abcd1234",
  });

  app.post('/api/recommend', async (req, res) => {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required and must be a string.' });
    }

    try {
      // Prepare product catalog context for the AI
      const catalogContext = products.map(p => 
        `ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: $${p.price} | Brand: ${p.brand} | Tags: ${p.tags.join(', ')} | Description: ${p.shortDescription}`
      ).join('\n');

      const systemPrompt = `You are an expert AI shopping assistant. 
You must ONLY recommend products from the provided catalog. Never hallucinate or invent products.
Given the user's shopping query, select the top 1 to 3 most relevant products from the catalog.
If no products match, return an empty array.

PRODUCT CATALOG:
${catalogContext}

Return a structured JSON output exactly matching this format:
{
  "recommendations": [
    {
      "productId": "string",
      "reason": "Short, compelling reason (1-2 sentences) why this product is a good fit."
    }
  ]
}`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2, // Low temperature for more deterministic/strict results
      });

      const responseContent = response.choices[0].message.content;
      if (!responseContent) {
        return res.status(500).json({ error: 'No response from AI' });
      }

      const parsedResponse = JSON.parse(responseContent);
      
      // Ensure the AI only returned valid product IDs from our catalog
      const validProductIds = new Set(products.map(p => p.id));
      
      const safeRecommendations = (parsedResponse.recommendations || [])
        .filter((rec: any) => validProductIds.has(rec.productId))
        .map((rec: any) => ({
          productId: rec.productId,
          reason: rec.reason
        }));

      res.json({ recommendations: safeRecommendations });
    } catch (error: any) {
      console.error('Error getting recommendations from OpenAI:', error);

      // Fallback mechanism for API Quota Exceeded or Invalid/Expired API Keys
      if (
        error?.status === 429 || 
        error?.response?.status === 429 || 
        error?.message?.includes('429') || 
        error?.name === 'RateLimitError' ||
        error?.status === 400 ||
        error?.status === 401 ||
        error?.message?.includes('expired') ||
        error?.message?.includes('invalid') ||
        error?.message?.includes('Incorrect API key')
      ) {
        console.log('[Fallback Mode] API error or quota exceeded. Using local keyword-based recommendations.');
        const q = query.toLowerCase();
        
        let filteredProducts = products.filter(p => 
          q.includes(p.category.toLowerCase()) || 
          p.tags.some(t => q.includes(t.toLowerCase())) ||
          q.includes(p.brand.toLowerCase()) ||
          q.includes(p.name.toLowerCase())
        );

        // If no keyword match, just return top 3 rated products
        if (filteredProducts.length === 0) {
          filteredProducts = [...products].sort((a, b) => b.rating - a.rating);
        }

        const fallbackResults = filteredProducts.slice(0, 3).map(p => ({
          productId: p.id,
          reason: `(Offline AI Fallback) Based on your search, the ${p.brand} ${p.name} is a strong match. It features a ${p.rating}-star rating and a competitive price of $${p.price}.`
        }));
        
        return res.json({ recommendations: fallbackResults });
      }

      res.status(500).json({ error: 'Failed to generate recommendations. Please try again.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
