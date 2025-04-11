import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Heart, ShoppingCart, Sparkles, Clock, Calendar, LanguagesIcon, BookIcon } from "lucide-react";
import { type Book } from "@/lib/types";
import { useState } from "react";

// Function to get mood-specific colors
const getMoodColorScheme = (mood: string) => {
  switch (mood.toLowerCase()) {
    case "happy":
      return {
        gradient: "from-yellow-400 to-orange-400",
        badge: "bg-yellow-100 text-yellow-800",
        button: "bg-orange-500 hover:bg-orange-600",
        accent: "text-orange-500"
      };
    case "sad":
      return {
        gradient: "from-blue-400 to-indigo-400",
        badge: "bg-blue-100 text-blue-800",
        button: "bg-blue-600 hover:bg-blue-700",
        accent: "text-blue-600"
      };
    case "energetic":
      return {
        gradient: "from-red-400 to-pink-400",
        badge: "bg-red-100 text-red-800",
        button: "bg-red-500 hover:bg-red-600",
        accent: "text-red-500"
      };
    case "relaxed":
      return {
        gradient: "from-green-400 to-teal-400",
        badge: "bg-green-100 text-green-800",
        button: "bg-teal-500 hover:bg-teal-600",
        accent: "text-teal-500"
      };
    case "curious":
      return {
        gradient: "from-purple-400 to-violet-400",
        badge: "bg-purple-100 text-purple-800",
        button: "bg-purple-600 hover:bg-purple-700",
        accent: "text-purple-600"
      };
    case "inspired":
      return {
        gradient: "from-rose-400 to-pink-400",
        badge: "bg-rose-100 text-rose-800",
        button: "bg-rose-500 hover:bg-rose-600",
        accent: "text-rose-500"
      };
    case "adventurous":
      return {
        gradient: "from-cyan-400 to-sky-400",
        badge: "bg-cyan-100 text-cyan-800",
        button: "bg-cyan-500 hover:bg-cyan-600",
        accent: "text-cyan-500"
      };
    case "anxious":
      return {
        gradient: "from-gray-400 to-blue-400",
        badge: "bg-gray-100 text-gray-800",
        button: "bg-blue-500 hover:bg-blue-600",
        accent: "text-blue-500"
      };
    default:
      return {
        gradient: "from-indigo-500 to-purple-500",
        badge: "bg-indigo-100 text-indigo-800",
        button: "bg-indigo-600 hover:bg-indigo-700",
        accent: "text-indigo-500"
      };
  }
};

interface BookDetailsModalProps {
  book: Book | null;
  mood: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailsModal({
  book,
  mood,
  isOpen,
  onClose
}: BookDetailsModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const colorScheme = getMoodColorScheme(mood);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${colorScheme.gradient} text-white`}>
              <BookOpen className="h-5 w-5" />
            </div>
            <DialogTitle className="text-2xl font-bold">{book.title}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Author and ratings */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-gray-600">by <span className="font-medium text-gray-800">{book.author}</span></span>
          </div>
          
          {/* Mood badge */}
          <div className="mb-6">
            <Badge className={`${colorScheme.badge} rounded-full text-sm px-3 py-1`}>
              Perfect for {mood} mood
            </Badge>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h4 className={`font-semibold ${colorScheme.accent} mb-3 flex items-center`}>
              <BookIcon className="h-4 w-4 mr-1.5" />
              About This Book
            </h4>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
          
          {/* Genres */}
          <div className="mb-6">
            <h4 className={`font-semibold ${colorScheme.accent} mb-3`}>Genres</h4>
            <div className="flex flex-wrap gap-2">
              {book.genres?.map((genre) => (
                <Badge key={genre} variant="outline" className="rounded-full">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Details */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <h5 className="text-xs text-gray-500">Pages</h5>
                <p className="font-medium">{book.pages || 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <h5 className="text-xs text-gray-500">Published</h5>
                <p className="font-medium">{book.publishedYear || 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <LanguagesIcon className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <h5 className="text-xs text-gray-500">Language</h5>
                <p className="font-medium">{book.language || 'N/A'}</p>
              </div>
            </div>
          </div>
          
          {/* Fun fact about the book */}
          <div className="p-4 bg-gray-50 rounded-lg mb-6 border border-gray-100">
            <div className="flex items-start">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg mr-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Fun Fact</h4>
                <p className="text-sm text-gray-600">
                  Reading books like "{book.title}" can boost your creativity and reduce stress by up to 68%. 
                  {book.publishedYear && ` This book was published in ${book.publishedYear}, making it a ${new Date().getFullYear() - book.publishedYear} year old treasure.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3 mt-4">
          {book.amazonLink && (
            <Button 
              variant="default" 
              className={`gap-1 w-full text-white ${colorScheme.button}`}
              onClick={() => window.open(book.amazonLink, '_blank')}
            >
              <ShoppingCart className="h-4 w-4" />
              Buy on Amazon
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
