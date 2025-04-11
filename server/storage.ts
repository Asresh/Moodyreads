import { 
  users, type User, type InsertUser,
  moods, type Mood, type InsertMood,
  books, type Book, type InsertBook,
  moodBooks, type MoodBook, type InsertMoodBook
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Mood operations
  getAllMoods(): Promise<Mood[]>;
  getMood(id: number): Promise<Mood | undefined>;
  getMoodByName(name: string): Promise<Mood | undefined>;
  createMood(mood: InsertMood): Promise<Mood>;

  // Book operations
  getAllBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;

  // MoodBook operations
  getMoodBooks(moodId: number): Promise<Book[]>;
  createMoodBook(moodBook: InsertMoodBook): Promise<MoodBook>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private moods: Map<number, Mood>;
  private books: Map<number, Book>;
  private moodBooks: Map<number, MoodBook>;
  private currentUserId: number;
  private currentMoodId: number;
  private currentBookId: number;
  private currentMoodBookId: number;

  constructor() {
    this.users = new Map();
    this.moods = new Map();
    this.books = new Map();
    this.moodBooks = new Map();
    this.currentUserId = 1;
    this.currentMoodId = 1;
    this.currentBookId = 1;
    this.currentMoodBookId = 1;

    // Initialize default moods
    this.initializeMoods();
    this.initializeBooks();
    this.initializeMoodBooks();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Mood operations
  async getAllMoods(): Promise<Mood[]> {
    return Array.from(this.moods.values());
  }

  async getMood(id: number): Promise<Mood | undefined> {
    return this.moods.get(id);
  }

  async getMoodByName(name: string): Promise<Mood | undefined> {
    return Array.from(this.moods.values()).find(
      (mood) => mood.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async createMood(insertMood: InsertMood): Promise<Mood> {
    const id = this.currentMoodId++;
    const mood: Mood = { ...insertMood, id };
    this.moods.set(id, mood);
    return mood;
  }

  // Book operations
  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentBookId++;
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }

  // MoodBook operations
  async getMoodBooks(moodId: number): Promise<Book[]> {
    const moodBookEntries = Array.from(this.moodBooks.values()).filter(
      (mb) => mb.moodId === moodId
    );
    
    return Promise.all(
      moodBookEntries.map(async (mb) => {
        const book = await this.getBook(mb.bookId);
        if (!book) throw new Error(`Book with id ${mb.bookId} not found`);
        return book;
      })
    );
  }

  async createMoodBook(insertMoodBook: InsertMoodBook): Promise<MoodBook> {
    const id = this.currentMoodBookId++;
    const moodBook: MoodBook = { ...insertMoodBook, id };
    this.moodBooks.set(id, moodBook);
    return moodBook;
  }

  // Initialize default data
  private initializeMoods() {
    const defaultMoods: InsertMood[] = [
      { name: "Happy", icon: "ri-emotion-happy-line", description: "Books that uplift and bring joy" },
      { name: "Relaxed", icon: "ri-emotion-normal-line", description: "Calming reads for peaceful moments" },
      { name: "Sad", icon: "ri-emotion-sad-line", description: "Books for emotional comfort" },
      { name: "Inspired", icon: "ri-lightbulb-line", description: "Motivational and thought-provoking books" },
      { name: "Adventurous", icon: "ri-compass-3-line", description: "Books full of excitement and exploration" },
      { name: "Curious", icon: "ri-question-line", description: "Books that satisfy your thirst for knowledge" }
    ];

    defaultMoods.forEach(mood => {
      const id = this.currentMoodId++;
      this.moods.set(id, { ...mood, id });
    });
  }

  private initializeBooks() {
    const defaultBooks: InsertBook[] = [
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. Would you have done anything different, if you had the chance to undo your regrets?",
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Fiction", "Fantasy", "Mental Health"],
        pages: 304,
        publishedYear: 2020,
        language: "English",
        rating: 4.5,
        ratingCount: 2345
      },
      {
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        description: "A magical island. A dangerous task. A burning secret. An enchanting love story, laced with humor and heartbreak.",
        coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Fantasy", "Fiction", "LGBT"],
        pages: 396,
        publishedYear: 2020,
        language: "English",
        rating: 4.0,
        ratingCount: 1987
      },
      {
        title: "A Man Called Ove",
        author: "Fredrik Backman",
        description: "A grumpy yet lovable man finds his solitary world turned on its head when a boisterous young family moves in next door.",
        coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Fiction", "Contemporary", "Humor"],
        pages: 337,
        publishedYear: 2012,
        language: "English",
        rating: 4.7,
        ratingCount: 3425
      },
      {
        title: "Eleanor Oliphant is Completely Fine",
        author: "Gail Honeyman",
        description: "A smart, warm, and uplifting story of an out-of-the-ordinary heroine whose deadpan weirdness and unconscious wit make for an irresistible journey.",
        coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Fiction", "Contemporary", "Mental Health"],
        pages: 327,
        publishedYear: 2017,
        language: "English",
        rating: 4.1,
        ratingCount: 2876
      },
      {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        description: "A woman shoots her husband five times in the face, and then never speaks another word. The psychotherapist who tries to get her to talk uncovers a shocking truth.",
        coverImage: "https://images.unsplash.com/photo-1518744386442-2d48ac47bafd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Mystery", "Thriller", "Psychological"],
        pages: 325,
        publishedYear: 2019,
        language: "English",
        rating: 4.2,
        ratingCount: 3146
      },
      {
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        description: "A story of a girl abandoned in the marsh who raises herself, only to be accused of murder years later.",
        coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Fiction", "Mystery", "Coming of Age"],
        pages: 368,
        publishedYear: 2018,
        language: "English",
        rating: 4.6,
        ratingCount: 4281
      },
      {
        title: "Educated",
        author: "Tara Westover",
        description: "A memoir about a woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
        coverImage: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Memoir", "Biography", "Nonfiction"],
        pages: 336,
        publishedYear: 2018,
        language: "English",
        rating: 4.5,
        ratingCount: 5142
      },
      {
        title: "Project Hail Mary",
        author: "Andy Weir",
        description: "A lone astronaut must save the earth from disaster in this cinematic thriller full of suspense, humor, and fascinating science.",
        coverImage: "https://images.unsplash.com/photo-1465106615569-5be00f0d10f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Science Fiction", "Adventure", "Space"],
        pages: 496,
        publishedYear: 2021,
        language: "English",
        rating: 4.8,
        ratingCount: 2753
      },
      {
        title: "Normal People",
        author: "Sally Rooney",
        description: "The story of mutual fascination, friendship and love between two very different young people at university.",
        coverImage: "https://images.unsplash.com/photo-1598495037740-2c360cf235d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Fiction", "Romance", "Contemporary"],
        pages: 273,
        publishedYear: 2018,
        language: "English",
        rating: 3.9,
        ratingCount: 2318
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        description: "Tiny Changes, Remarkable Results. No matter your goals, this book offers a proven framework for improving every day.",
        coverImage: "https://images.unsplash.com/photo-1505778276668-26b3ff7af103?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Self Help", "Nonfiction", "Psychology"],
        pages: 320,
        publishedYear: 2018,
        language: "English",
        rating: 4.3,
        ratingCount: 7864
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        description: "A fable about following your dream and listening to your heart as a shepherd boy goes on a journey in search of treasure.",
        coverImage: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Fiction", "Philosophy", "Fantasy"],
        pages: 197,
        publishedYear: 1988,
        language: "English",
        rating: 4.6,
        ratingCount: 6214
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover.",
        coverImage: "https://images.unsplash.com/photo-1551405780-95a51d464434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        genres: ["Classics", "Fiction", "Literature"],
        pages: 180,
        publishedYear: 1925,
        language: "English",
        rating: 4.4,
        ratingCount: 8234
      }
    ];

    defaultBooks.forEach(book => {
      const id = this.currentBookId++;
      this.books.set(id, { ...book, id });
    });
  }

  private initializeMoodBooks() {
    // Map books to moods
    const moodBookMappings = [
      { moodName: "Happy", bookIndices: [1, 2, 3, 4] }, // Books 1-4 for Happy
      { moodName: "Relaxed", bookIndices: [2, 8, 9, 11] }, // Books 2, 8, 9, 11 for Relaxed
      { moodName: "Sad", bookIndices: [1, 3, 5, 9] }, // Books 1, 3, 5, 9 for Sad
      { moodName: "Inspired", bookIndices: [7, 10, 11, 12] }, // Books 7, 10, 11, 12 for Inspired
      { moodName: "Adventurous", bookIndices: [6, 8, 11, 12] }, // Books 6, 8, 11, 12 for Adventurous
      { moodName: "Curious", bookIndices: [5, 7, 8, 10] } // Books 5, 7, 8, 10 for Curious
    ];

    moodBookMappings.forEach(async (mapping) => {
      const mood = await this.getMoodByName(mapping.moodName);
      if (mood) {
        mapping.bookIndices.forEach((bookIndex) => {
          const moodBook: InsertMoodBook = {
            moodId: mood.id,
            bookId: bookIndex
          };
          const id = this.currentMoodBookId++;
          this.moodBooks.set(id, { ...moodBook, id });
        });
      }
    });
  }
}

export const storage = new MemStorage();
