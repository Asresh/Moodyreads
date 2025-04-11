import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  amazonLink: string;
  genres: string[];
  pages: number | null;
  publishedYear: number | null;
  language: string | null;
  rating: number;
  ratingCount: number;
}

export async function getBookRecommendationsForMood(mood: string, count: number = 5): Promise<BookRecommendation[]> {
  try {
    const prompt = `
You are a book recommendation system. Based on the mood "${mood}", recommend ${count} books that would be perfect for someone feeling this way.

For each book, provide the following details in JSON format:
- title: The book's title
- author: The book's author
- description: A compelling description of the book (150-200 words)
- genres: Array of 2-3 genres the book fits into
- pages: Approximate page count (use null if unknown)
- publishedYear: Year of publication (use null if unknown)
- language: Primary language of the book (use null if unknown)
- rating: A rating from 1-5 (with one decimal precision)
- ratingCount: Approximate number of reviews/ratings
- amazonLink: An Amazon link to purchase the book (format should be "https://www.amazon.com/dp/[ASIN]")

Ensure the books are varied but all appropriate for the mood. Provide genuine, well-known books.
Return the results as a JSON array of book objects.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful book recommendation assistant that provides accurate, detailed book information with valid Amazon purchase links." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const parsedResponse = JSON.parse(content);
    
    // Convert the OpenAI response to our BookRecommendation format
    // Use a placeholder cover image if none is provided
    return parsedResponse.books.map((book: any) => ({
      ...book,
      coverImage: book.coverImage || `https://via.placeholder.com/200x300?text=${encodeURIComponent(book.title)}`,
    }));
  } catch (error: unknown) {
    console.error("Error getting book recommendations:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to get book recommendations: ${error.message}`);
    } else {
      throw new Error("Failed to get book recommendations: Unknown error");
    }
  }
}