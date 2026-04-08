export interface AssessmentQuestion {
  id: string;
  question: string;
  category: "emotional" | "physical" | "mental" | "social";
}

export interface AssessmentResult {
  score: number;
  level: "low" | "moderate" | "high" | "severe";
  date: string;
  recommendations: string[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  { id: "q1", question: "Я чувствую себя эмоционально истощенным", category: "emotional" },
  { id: "q2", question: "Я чувствую усталость, когда встаю утром", category: "physical" },
  { id: "q3", question: "Работа с людьми весь день требует больших усилий", category: "social" },
  { id: "q4", question: "Я чувствую себя опустошенным к концу рабочего дня", category: "emotional" },
  { id: "q5", question: "Я стал более циничным по отношению к своей работе", category: "mental" },
  { id: "q6", question: "Мне трудно сосредоточиться на задачах", category: "mental" },
  { id: "q7", question: "Я избегаю социальных взаимодействий", category: "social" },
  { id: "q8", question: "У меня проблемы со сном", category: "physical" },
  { id: "q9", question: "Я чувствую себя менее продуктивным", category: "mental" },
  { id: "q10", question: "Я потерял интерес к вещам, которые раньше приносили радость", category: "emotional" },
];

export const getRecommendations = (level: string): string[] => {
  const recommendations: Record<string, string[]> = {
    low: [
      "Продолжайте поддерживать здоровый баланс работы и отдыха",
      "Практикуйте регулярные техники релаксации",
      "Поддерживайте социальные связи",
    ],
    moderate: [
      "Уделите внимание качественному отдыху и сну",
      "Рассмотрите возможность делегирования задач",
      "Практикуйте медитацию или йогу",
      "Обсудите нагрузку с руководством",
    ],
    high: [
      "Срочно пересмотрите свою рабочую нагрузку",
      "Обратитесь за поддержкой к близким или специалисту",
      "Возьмите отпуск или выходные для восстановления",
      "Начните регулярную практику mindfulness",
      "Ограничьте сверхурочную работу",
    ],
    severe: [
      "Настоятельно рекомендуется консультация с психологом",
      "Рассмотрите возможность медицинского отпуска",
      "Немедленно снизьте рабочую нагрузку",
      "Обратитесь к врачу для комплексного обследования",
      "Создайте план восстановления с профессиональной помощью",
    ],
  };
  return recommendations[level] || recommendations.moderate;
};

export const calculateBurnoutLevel = (score: number): AssessmentResult["level"] => {
  if (score <= 15) return "low";
  if (score <= 30) return "moderate";
  if (score <= 40) return "high";
  return "severe";
};
