import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MoodSelector from '@/components/MoodSelector';
import BookDetailsModal from '@/components/BookDetailsModal';
import { BookOpen, BookMarked, Coffee, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Mood, type Book } from '@/lib/types';

// Reading facts to display during loading
const readingFacts = [
  "Reading for just 6 minutes can reduce stress by up to 68%.",
  "The world's fastest reader could read War and Peace in under 20 minutes.",
  "Reading fiction increases empathy and understanding of others.",
  "The average CEO reads 60 books per year.",
  "The word 'bookworm' originated from insects that eat books.",
  "The scent of old books is called 'bibliosmia'.",
  "Reading burns more calories than watching TV.",
  "The first modern audiobook was created for the blind in 1934.",
  "25% of books purchased are never read to completion.",
  "The average length of a New York Times bestseller is 375 pages.",
  "The term 'bibliotaph' refers to someone who hoards books.",
  "Reading stimulates the same neurological regions as physical experience.",
  "People who read fiction have better social cognition skills.",
  "Tsundoku is the Japanese word for buying books and never reading them.",
  "E-reader users read 20% faster than print readers."
];

// Function to get theme based on mood
const getMoodTheme = (mood: string | null) => {
  if (!mood) return {
    bgColor: "from-indigo-50 to-white",
    accentColor: "from-purple-600 to-indigo-600",
    buttonBg: "bg-indigo-600 hover:bg-indigo-700",
    cardBg: "bg-white",
    textColor: "text-gray-800"
  };
  
  switch (mood.toLowerCase()) {
    case "happy":
      return {
        bgColor: "from-yellow-50 to-orange-50",
        accentColor: "from-yellow-400 to-orange-500",
        buttonBg: "bg-orange-500 hover:bg-orange-600",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
    case "sad":
      return {
        bgColor: "from-blue-50 to-indigo-50",
        accentColor: "from-blue-400 to-indigo-500",
        buttonBg: "bg-blue-600 hover:bg-blue-700",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
    case "energetic":
      return {
        bgColor: "from-red-50 to-pink-50",
        accentColor: "from-red-500 to-pink-500",
        buttonBg: "bg-red-500 hover:bg-red-600",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
    case "relaxed":
      return {
        bgColor: "from-green-50 to-teal-50",
        accentColor: "from-green-400 to-teal-500",
        buttonBg: "bg-teal-500 hover:bg-teal-600",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
    case "curious":
      return {
        bgColor: "from-purple-50 to-violet-50",
        accentColor: "from-purple-500 to-violet-500",
        buttonBg: "bg-purple-600 hover:bg-purple-700",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
    case "inspired":
      return {
        bgColor: "from-rose-50 to-pink-50",
        accentColor: "from-rose-400 to-pink-500",
        buttonBg: "bg-rose-500 hover:bg-rose-600",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
    case "adventurous":
      return {
        bgColor: "from-cyan-50 to-sky-50",
        accentColor: "from-cyan-400 to-sky-500",
        buttonBg: "bg-cyan-500 hover:bg-cyan-600",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
    case "anxious":
      return {
        bgColor: "from-gray-50 to-blue-50",
        accentColor: "from-gray-400 to-blue-400",
        buttonBg: "bg-blue-500 hover:bg-blue-600",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
    default:
      return {
        bgColor: "from-indigo-50 to-white",
        accentColor: "from-purple-600 to-indigo-600",
        buttonBg: "bg-indigo-600 hover:bg-indigo-700",
        cardBg: "bg-white",
        textColor: "text-gray-800"
      };
  }
};

// Book Recommendation Component without images
const BookRecommendation = ({ book, mood, onViewDetails }: { book: Book, mood: string, onViewDetails: (book: Book) => void }) => {
  const theme = getMoodTheme(mood);
  
  return (
    <div 
      className={`${theme.cardBg} p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:-translate-y-1`}
      onClick={() => onViewDetails(book)}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${theme.accentColor} text-white`}>
          <BookMarked className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${theme.textColor} line-clamp-2`}>{book.title}</h3>
          <p className="text-gray-500 text-sm mt-1">by {book.author}</p>
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">{book.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {book.genres?.map((genre, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {genre}
              </span>
            ))}
          </div>
          
          <button 
            className={`mt-4 px-4 py-2 rounded-lg text-white text-sm font-medium ${theme.buttonBg} transition-colors duration-200 w-full flex items-center justify-center`}
          >
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading book placeholder with reading facts
const LoadingBookWithFact = ({ index, mood }: { index: number, mood: string }) => {
  // Get a random fact based on the index
  const fact = readingFacts[index % readingFacts.length];
  const theme = getMoodTheme(mood);
  
  return (
    <div className="p-6 rounded-xl bg-white shadow animate-pulse border border-gray-100 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.accentColor} opacity-10 z-0`}></div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${theme.accentColor} bg-opacity-20`}>
            <Coffee className={`h-5 w-5 text-${mood.toLowerCase() === 'happy' ? 'orange' : mood.toLowerCase() === 'sad' ? 'blue' : mood.toLowerCase() === 'relaxed' ? 'teal' : mood.toLowerCase() === 'inspired' ? 'rose' : mood.toLowerCase() === 'curious' ? 'purple' : mood.toLowerCase() === 'adventurous' ? 'cyan' : 'indigo'}-500`} />
          </div>
          <div className={`text-base font-semibold text-${mood.toLowerCase() === 'happy' ? 'orange' : mood.toLowerCase() === 'sad' ? 'blue' : mood.toLowerCase() === 'relaxed' ? 'teal' : mood.toLowerCase() === 'inspired' ? 'rose' : mood.toLowerCase() === 'curious' ? 'purple' : mood.toLowerCase() === 'adventurous' ? 'cyan' : 'indigo'}-700`}>Reading Fact</div>
        </div>
        <p className="text-gray-700 italic">{fact}</p>
        <div className="mt-4 h-2 bg-gray-200 rounded"></div>
        <div className="mt-3 h-2 bg-gray-200 rounded w-5/6"></div>
        <div className="mt-6 flex justify-between items-center">
          <div className="h-2 bg-gray-200 rounded w-2/5"></div>
          <div className="h-2 bg-gray-200 rounded w-1/5"></div>
        </div>
        <div className="mt-6 flex">
          <div className={`mt-3 h-8 rounded w-full bg-${mood.toLowerCase() === 'happy' ? 'orange' : mood.toLowerCase() === 'sad' ? 'blue' : mood.toLowerCase() === 'relaxed' ? 'teal' : mood.toLowerCase() === 'inspired' ? 'rose' : mood.toLowerCase() === 'curious' ? 'purple' : mood.toLowerCase() === 'adventurous' ? 'cyan' : 'indigo'}-100`}></div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomFacts, setRandomFacts] = useState<string[]>([]);

  // Get theme based on selected mood
  const theme = getMoodTheme(selectedMood?.name || null);

  // Fetch all moods
  const {
    data: moods = [],
    isLoading: isLoadingMoods,
    error: moodsError
  } = useQuery<Mood[]>({
    queryKey: ['/api/moods'],
  });

  // Fetch AI-generated recommendations for the selected mood
  const {
    data: aiRecommendations = [],
    isLoading: isLoadingAiRecommendations,
    error: aiRecommendationsError,
    refetch: refetchRecommendations
  } = useQuery<Book[]>({
    queryKey: [selectedMood ? `/api/moods/${selectedMood.name}/ai-recommendations` : null],
    enabled: !!selectedMood,
  });

  // Set random reading facts when loading
  useEffect(() => {
    if (isLoadingAiRecommendations) {
      // Shuffle reading facts and pick the first 4
      const shuffled = [...readingFacts].sort(() => 0.5 - Math.random());
      setRandomFacts(shuffled.slice(0, 4));
    }
  }, [isLoadingAiRecommendations]);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleViewBookDetails = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  // Handle regenerating book recommendations
  const handleRegenerateBooks = async () => {
    await refetchRecommendations();
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${theme.bgColor} transition-all duration-500`}>
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Intro Section */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.accentColor}`}>
              Find Your Perfect Book Match
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Select your current mood and we'll recommend the perfect books to complement how you're feeling right now.
          </p>
        </section>

        {/* Mood Selection */}
        <div className="w-full mb-8">
          {moodsError ? (
            <div className="text-red-500 p-4 bg-red-50 rounded-lg">
              Error loading moods. Please try again later.
            </div>
          ) : (
            <MoodSelector 
              moods={moods} 
              selectedMood={selectedMood} 
              onMoodSelect={handleMoodSelect}
              isLoading={isLoadingMoods}
            />
          )}
        </div>

        {/* Book Recommendations */}
        {selectedMood && (
          <div className="w-full mt-6">
            <div className="mb-6 flex justify-between items-center">
              <h3 className={`text-xl font-semibold ${theme.textColor} flex items-center`}>
                <Sparkles className="h-5 w-5 mr-2 text-primary-500" />
                <span>Top 4 Books for when you're feeling <span className={`font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.accentColor}`}>{selectedMood.name}</span></span>
              </h3>
              {aiRecommendations.length > 0 && !isLoadingAiRecommendations && (
                <Button 
                  variant="outline" 
                  className={`px-3 transition-all duration-300 hover:bg-opacity-10 bg-opacity-5 bg-gradient-to-r ${theme.accentColor} border-none`}
                  onClick={handleRegenerateBooks}
                  disabled={isLoadingAiRecommendations}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingAiRecommendations ? 'animate-spin' : ''}`} />
                  <span>Read Something Else</span>
                </Button>
              )}
            </div>

            {aiRecommendationsError ? (
              <div className="text-red-500 p-4 rounded-lg bg-red-50 border border-red-100">
                <p className="font-medium">Error loading book recommendations</p>
                <p className="text-sm mt-1">Please try again later or select a different mood.</p>
              </div>
            ) : isLoadingAiRecommendations ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <LoadingBookWithFact key={i} index={i} mood={selectedMood.name} />
                ))}
              </div>
            ) : aiRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {aiRecommendations.slice(0, 4).map((book: Book, index: number) => (
                  <BookRecommendation 
                    key={index} 
                    book={{...book, id: 1000 + index}} // Assign temporary IDs to AI books
                    mood={selectedMood.name}
                    onViewDetails={handleViewBookDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-4 text-gray-500 text-lg">No book recommendations found for this mood.</p>
                <p className="text-gray-400">Try selecting a different mood.</p>
              </div>
            )}
          </div>
        )}

        {/* Only show placeholder when no mood is selected */}
        {!selectedMood && !isLoadingMoods && moods.length > 0 && (
          <div className="text-center py-16 mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-700 text-lg font-medium">
              Select a mood above to discover your perfect reads
            </p>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Our AI will analyze your current mood and suggest books tailored just for you
            </p>
          </div>
        )}
      </main>

      <BookDetailsModal 
        book={selectedBook} 
        mood={selectedMood?.name || ''} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      <Footer />
    </div>
  );
}
