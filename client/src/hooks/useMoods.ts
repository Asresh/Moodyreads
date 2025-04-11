import { useQuery } from '@tanstack/react-query';
import { type Mood } from '@/lib/types';

export function useMoods() {
  return useQuery<Mood[]>({
    queryKey: ['/api/moods'],
  });
}

export function useMoodBooks(moodId: number | null) {
  return useQuery({
    queryKey: moodId ? [`/api/moods/${moodId}/books`] : null,
    enabled: !!moodId,
  });
}
