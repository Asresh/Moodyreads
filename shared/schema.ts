import { pgTable, text, serial, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Defining the moods table
export const moods = pgTable("moods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  icon: text("icon").notNull(),
  description: text("description"),
});

export const insertMoodSchema = createInsertSchema(moods).pick({
  name: true,
  icon: true,
  description: true,
});

export type InsertMood = z.infer<typeof insertMoodSchema>;
export type Mood = typeof moods.$inferSelect;

// Defining the books table
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  amazonLink: text("amazon_link"),
  genres: text("genres").array(),
  pages: integer("pages"),
  publishedYear: integer("published_year"),
  language: text("language"),
  rating: doublePrecision("rating"),
  ratingCount: integer("rating_count"),
});

export const insertBookSchema = createInsertSchema(books).pick({
  title: true,
  author: true,
  description: true,
  coverImage: true,
  amazonLink: true,
  genres: true,
  pages: true,
  publishedYear: true,
  language: true,
  rating: true,
  ratingCount: true,
});

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;

// Defining the moodBooks table for the relationship between moods and books
export const moodBooks = pgTable("mood_books", {
  id: serial("id").primaryKey(),
  moodId: integer("mood_id").notNull(),
  bookId: integer("book_id").notNull(),
});

export const insertMoodBookSchema = createInsertSchema(moodBooks).pick({
  moodId: true,
  bookId: true,
});

export type InsertMoodBook = z.infer<typeof insertMoodBookSchema>;
export type MoodBook = typeof moodBooks.$inferSelect;
