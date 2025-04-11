import { type Mood } from "@/lib/types";

// Mood color themes
const getMoodColors = (mood: string) => {
  switch (mood.toLowerCase()) {
    case "happy":
      return {
        bg: "from-yellow-400 to-orange-400",
        icon: "text-white",
        hover: "hover:shadow-yellow-200",
        selected: "ring-yellow-300 shadow-yellow-200"
      };
    case "sad":
      return {
        bg: "from-blue-400 to-indigo-400",
        icon: "text-white",
        hover: "hover:shadow-blue-200",
        selected: "ring-blue-300 shadow-blue-200"
      };
    case "energetic":
      return {
        bg: "from-red-400 to-pink-400",
        icon: "text-white",
        hover: "hover:shadow-red-200",
        selected: "ring-red-300 shadow-red-200"
      };
    case "relaxed":
      return {
        bg: "from-green-400 to-teal-400",
        icon: "text-white",
        hover: "hover:shadow-green-200",
        selected: "ring-green-300 shadow-green-200"
      };
    case "curious":
      return {
        bg: "from-purple-400 to-violet-400",
        icon: "text-white",
        hover: "hover:shadow-purple-200",
        selected: "ring-purple-300 shadow-purple-200"
      };
    case "inspired":
      return {
        bg: "from-rose-400 to-pink-400",
        icon: "text-white",
        hover: "hover:shadow-rose-200",
        selected: "ring-rose-300 shadow-rose-200"
      };
    case "adventurous":
      return {
        bg: "from-cyan-400 to-sky-400",
        icon: "text-white",
        hover: "hover:shadow-cyan-200",
        selected: "ring-cyan-300 shadow-cyan-200"
      };
    case "anxious":
      return {
        bg: "from-gray-400 to-blue-400",
        icon: "text-white",
        hover: "hover:shadow-gray-200",
        selected: "ring-gray-300 shadow-gray-200"
      };
    default:
      return {
        bg: "from-gray-300 to-gray-400",
        icon: "text-white",
        hover: "hover:shadow-gray-200",
        selected: "ring-gray-300 shadow-gray-200"
      };
  }
};

// Descriptive text for each mood
const getMoodDescription = (mood: string) => {
  switch (mood.toLowerCase()) {
    case "happy":
      return "Cheerful, joyful, optimistic";
    case "sad":
      return "Melancholic, reflective, emotional";
    case "energetic":
      return "Motivated, excited, passionate";
    case "relaxed":
      return "Calm, peaceful, tranquil";
    case "curious":
      return "Inquisitive, explorative, intrigued";
    case "inspired":
      return "Creative, uplifted, visionary";
    case "adventurous":
      return "Bold, daring, exploratory";
    case "anxious":
      return "Worried, unsettled, tense";
    default:
      return "";
  }
};

interface MoodSelectorProps {
  moods: Mood[];
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
  isLoading: boolean;
}

export default function MoodSelector({ 
  moods, 
  selectedMood, 
  onMoodSelect,
  isLoading
}: MoodSelectorProps) {
  if (isLoading) {
    return (
      <section className={`${selectedMood ? "" : "mb-10"}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          <span className="inline-block animate-pulse bg-gray-200 h-7 w-56 rounded"></span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="bg-white rounded-xl shadow animate-pulse p-6 relative overflow-hidden"
            >
              <div className="h-10 w-10 rounded-full bg-gray-200 mb-4"></div>
              <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
              <div className="h-3 bg-gray-100 rounded w-full mt-3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`${selectedMood ? "" : "mb-10"} transition-all duration-300`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
          How are you feeling today?
        </span>
      </h3>
      <div className={`grid grid-cols-2 sm:grid-cols-3 ${selectedMood ? 'gap-3' : 'gap-5'} transition-all duration-300`}>
        {moods.map((mood) => {
          const colors = getMoodColors(mood.name);
          const description = getMoodDescription(mood.name);
          const isSelected = selectedMood?.id === mood.id;
          
          return (
            <div
              key={mood.id}
              onClick={() => onMoodSelect(mood)}
              className={`mood-option relative rounded-xl cursor-pointer transition-all duration-300 transform
                bg-white shadow-sm hover:shadow-lg ${colors.hover}
                ${isSelected ? `ring-2 ${colors.selected} scale-[1.02]` : 'hover:scale-[1.01]'}
                ${selectedMood && !isSelected ? 'opacity-80 hover:opacity-100' : ''}
              `}
            >
              <div className="p-5">
                <div 
                  className={`bg-gradient-to-r ${colors.bg} rounded-full p-3 w-12 h-12
                    flex items-center justify-center mb-3`}
                >
                  <i className={`${mood.icon} text-xl ${colors.icon}`}></i>
                </div>
                <h4 className="font-bold text-gray-900">{mood.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 bg-primary-50/20 pointer-events-none rounded-xl"></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
