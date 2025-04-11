import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { getBookRecommendationsForMood } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all moods
  app.get("/api/moods", async (req, res) => {
    try {
      const moods = await storage.getAllMoods();
      res.json(moods);
    } catch (error) {
      console.error("Error fetching moods:", error);
      res.status(500).json({ message: "Failed to fetch moods" });
    }
  });

  // Get mood by ID
  app.get("/api/moods/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid mood ID" });
      }

      const mood = await storage.getMood(id);
      if (!mood) {
        return res.status(404).json({ message: "Mood not found" });
      }

      res.json(mood);
    } catch (error) {
      console.error("Error fetching mood:", error);
      res.status(500).json({ message: "Failed to fetch mood" });
    }
  });

  // Get all books
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  // Get book by ID
  app.get("/api/books/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }

      const book = await storage.getBook(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.json(book);
    } catch (error) {
      console.error("Error fetching book:", error);
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });

  // Get books by mood
  app.get("/api/moods/:id/books", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid mood ID" });
      }

      const mood = await storage.getMood(id);
      if (!mood) {
        return res.status(404).json({ message: "Mood not found" });
      }

      const books = await storage.getMoodBooks(id);
      res.json(books);
    } catch (error) {
      console.error("Error fetching books by mood:", error);
      res.status(500).json({ message: "Failed to fetch books by mood" });
    }
  });

  // Get books by mood name
  app.get("/api/moods/name/:name/books", async (req, res) => {
    try {
      const name = req.params.name;
      const mood = await storage.getMoodByName(name);
      
      if (!mood) {
        return res.status(404).json({ message: "Mood not found" });
      }

      const books = await storage.getMoodBooks(mood.id);
      res.json(books);
    } catch (error) {
      console.error("Error fetching books by mood name:", error);
      res.status(500).json({ message: "Failed to fetch books by mood name" });
    }
  });

  // Get AI-powered book recommendations for a mood
  app.get("/api/moods/:name/ai-recommendations", async (req, res) => {
    try {
      const moodName = req.params.name;
      const count = req.query.count ? parseInt(req.query.count as string) : 5;
      
      // Validate count
      if (isNaN(count) || count < 1 || count > 10) {
        return res.status(400).json({ message: "Invalid count parameter. Must be between 1 and 10." });
      }

      // Get AI recommendations
      const recommendations = await getBookRecommendationsForMood(moodName, count);
      res.json(recommendations);
    } catch (error) {
      console.error("Error getting AI recommendations:", error);
      res.status(500).json({ 
        message: "Failed to get AI book recommendations",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
