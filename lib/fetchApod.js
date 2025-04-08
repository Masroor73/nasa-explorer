// lib/fetchApod.js

export async function fetchApod(date = null) {
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
    const baseUrl = `https://api.nasa.gov/planetary/apod`;
  
    const url = new URL(baseUrl);
    url.searchParams.set("api_key", apiKey);
    if (date) url.searchParams.set("date", date); // Optional date filter
  
    const res = await fetch(url.toString());
  
    if (!res.ok) {
      throw new Error("Failed to fetch APOD");
    }
  
    const data = await res.json();
    return data;
  }
  