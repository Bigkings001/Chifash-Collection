/**
 * Next.js ISR (Incremental Static Regeneration) implementation
 * For product detail pages and category pages
 */

import React from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';

// Example for product detail page with ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return {
        notFound: true,
        revalidate: 60, // Try again in 60 seconds
      };
    }

    const product = await response.json();

    return {
      props: {
        product,
      },
      // ISR: Revalidate every 60 seconds (stale-while-revalidate pattern)
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/?limit=100`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    // Get top products for initial generation
    const products = data.results || data;
    const paths = products.slice(0, 50).map((product: any) => ({
      params: { slug: product.slug },
    }));

    return {
      paths,
      // ISR: Generate new pages on-demand
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching product paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

// Example cache helper for client-side requests
export const fetchWithCache = async (
  url: string,
  options: RequestInit & { cacheDuration?: number } = {}
) => {
  const { cacheDuration = 60000, ...fetchOptions } = options;

  // Check browser cache
  const cacheKey = `fetch:${url}`;
  const cached = sessionStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheDuration) {
      return data;
    }
  }

  // Fetch fresh data
  const response = await fetch(url, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const data = await response.json();

  // Store in cache
  sessionStorage.setItem(
    cacheKey,
    JSON.stringify({ data, timestamp: Date.now() })
  );

  return data;
};

/**
 * Stale-While-Revalidate (SWR) Hook for React
 * Returns cached data immediately while fetching fresh data in background
 */
export const useSWR = (url: string, options?: any) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Try cache first
    const cacheKey = `swr:${url}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      const { data: cachedData } = JSON.parse(cached);
      setData(cachedData);
      setIsLoading(false);
    }

    // Fetch fresh data
    fetch(url, options)
      .then(res => res.json())
      .then(newData => {
        setData(newData);
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({ data: newData, timestamp: Date.now() })
        );
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [url, options]);

  return { data, error, isLoading };
};
