// app/utils/storage.ts

export interface AssessmentResult {
  date: string;      // ISO строка (new Date().toISOString())
  score: number;     // сумма баллов
  level: string;     // уровень: 'low' | 'moderate' | 'high' | 'severe'
}

const STORAGE_KEY = 'rebalance-assessments';

/** Получить всю историю прохождений */
export function getAssessmentHistory(): AssessmentResult[] {
  if (typeof window === 'undefined') return []; // защита для SSR
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/** Сохранить новый результат */
export function saveAssessmentResult(result: AssessmentResult): void {
  const history = getAssessmentHistory();
  history.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/** Получить последний результат */
export function getLastAssessmentResult(): AssessmentResult | null {
  const history = getAssessmentHistory();
  return history.length > 0 ? history[history.length - 1] : null;
}

/** Очистить всю историю (опционально, для отладки) */
export function clearAssessmentHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}