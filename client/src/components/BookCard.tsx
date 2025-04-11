import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { type Book } from "@/lib/types";

interface BookCardProps {
  book: Book;
  mood: string;
  onViewDetails: (book: Book) => void;
}

export default function BookCard({ book, mood, onViewDetails }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card 
      className="book-card bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md flex flex-col cursor-pointer"
      onClick={() => onViewDetails(book)}
    >
      <div className="relative pb-[140%] overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute top-2 right-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleFavorite}
            className={`p-1.5 rounded-full bg-white/80 hover:bg-white ${
              isFavorite ? 'text-rose-500 hover:text-rose-600' : 'text-gray-600 hover:text-rose-500'
            } focus:outline-none focus:ring-2 focus:ring-rose-500`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h4 className="font-poppins font-semibold text-gray-900 mb-1">
            {book.title}
          </h4>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          <div className="flex items-center mb-3">
            <div className="flex text-amber-400">
              {[...Array(Math.floor(book.rating))].map((_, i) => (
                <i key={i} className="ri-star-fill text-sm"></i>
              ))}
              {book.rating % 1 >= 0.5 && (
                <i className="ri-star-half-fill text-sm"></i>
              )}
              {[...Array(5 - Math.ceil(book.rating))].map((_, i) => (
                <i key={i} className="ri-star-line text-sm"></i>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">{book.rating}</span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2">
            {book.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Badge variant="outline" className="bg-primary-50 text-primary-800 hover:bg-primary-100 flex items-center">
            <i className="ri-emotion-happy-line mr-0.5"></i>
            {mood}
          </Badge>
          <Button variant="link" className="text-primary text-sm p-0 h-auto">
            More info
          </Button>
        </div>
      </div>
    </Card>
  );
}
