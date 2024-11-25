"use server";

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    console.log("Triggering scrapeAmazonProduct with URL:", productUrl); // Add log
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    console.log("Product scraped:", scrapedProduct); // Log scraped product
    return scrapedProduct; // Ensure scraped data is returned
  } catch (error: any) {
    console.error("Error in scrapeAndStoreProduct:", error.message);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
