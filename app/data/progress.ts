export interface ProgressEntry {
  id: string;
  date: string;
  burnoutLevel: number;
  mood: "great" | "good" | "okay" | "low" | "poor";
  notes?: string;
}

export const progressEntries: ProgressEntry[] = [
  { id: "p1", date: "2024-01-15", burnoutLevel: 35, mood: "low", notes: "Тяжелая неделя" },
  { id: "p2", date: "2024-01-22", burnoutLevel: 32, mood: "okay", notes: "Начал медитировать" },
  { id: "p3", date: "2024-01-29", burnoutLevel: 28, mood: "okay" },
  { id: "p4", date: "2024-02-05", burnoutLevel: 25, mood: "good", notes: "Чувствую улучшение" },
  { id: "p5", date: "2024-02-12", burnoutLevel: 22, mood: "good" },
  { id: "p6", date: "2024-02-19", burnoutLevel: 20, mood: "good", notes: "Установил границы" },
  { id: "p7", date: "2024-02-26", burnoutLevel: 18, mood: "great", notes: "Отличная неделя!" },
];

export const getMoodLabel = (mood: ProgressEntry["mood"]): string => {
  const labels: Record<ProgressEntry["mood"], string> = {
    great: "Отлично",
    good: "Хорошо",
    okay: "Нормально",
    low: "Плохо",
    poor: "Очень плохо",
  };
  return labels[mood];
};

export const getMoodColor = (mood: ProgressEntry["mood"]): string => {
  const colors: Record<ProgressEntry["mood"], string> = {
    great: "var(--color-success-9)",
    good: "var(--color-accent-9)",
    okay: "var(--color-warning-9)",
    low: "var(--orange-9)",
    poor: "var(--color-error-9)",
  };
  return colors[mood];
};
