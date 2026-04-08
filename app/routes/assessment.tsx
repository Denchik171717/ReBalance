import { useState } from "react";
import { Link, useFetcher } from "react-router";
import { Header } from "~/components/header";
import { AuthGuard } from "~/components/auth-guard";
import { Button } from "~/components/ui/button/button";
import { getUser } from "~/utils/auth.server";
import { assessmentQuestions, calculateBurnoutLevel, getRecommendations } from "~/data/assessments";
import { saveAssessmentResult } from "~/utils/storage"; // добавлен импорт
import type { Route } from "./+types/assessment";
import styles from "./assessment.module.css";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  return { user };
}

export default function Assessment({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const fetcher = useFetcher();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const totalQuestions = assessmentQuestions.length;
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const level = calculateBurnoutLevel(totalScore);
    
    // Сохраняем результат в localStorage
    const result = {
      date: new Date().toISOString(),
      score: totalScore,
      level,
    };
    saveAssessmentResult(result);
    
    // Отправка на сервер (если пользователь авторизован)
    if (user) {
      fetcher.submit(
        {
          assessmentId: "burnout-assessment",
          score: totalScore.toString(),
          totalQuestions: totalQuestions.toString(),
          timeSpent: timeSpent.toString(),
        },
        { method: "post", action: "/api/assessment/submit" }
      );
    }
    
    setShowResults(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setShowResults(false);
  };

  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const level = calculateBurnoutLevel(totalScore);
  const recommendations = getRecommendations(level);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      emotional: "Эмоциональное",
      physical: "Физическое",
      mental: "Ментальное",
      social: "Социальное",
    };
    return labels[category] || category;
  };

  const getLevelClass = (level: string) => {
    const classes: Record<string, string> = {
      low: styles.levelLow,
      moderate: styles.levelModerate,
      high: styles.levelHigh,
      severe: styles.levelSevere,
    };
    return classes[level];
  };

  const getLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      low: "Низкий уровень",
      moderate: "Умеренный уровень",
      high: "Высокий уровень",
      severe: "Критический уровень",
    };
    return labels[level];
  };

  if (showResults) {
    return (
      <AuthGuard user={user}>
        <div className={styles.page}>
          <Header />
          <div className={styles.container}>
            <div className={styles.results}>
              <h1 className={styles.resultsTitle}>Результаты оценки</h1>
              <div className={styles.scoreDisplay} style={{ color: "var(--color-accent-11)" }}>
                {totalScore} / 50
              </div>
              <div className={`${styles.levelBadge} ${getLevelClass(level)}`}>{getLevelLabel(level)}</div>

              <div className={styles.recommendations}>
                <h2 className={styles.recommendationsTitle}>Рекомендации для вас</h2>
                <ul className={styles.recommendationsList}>
                  {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.actions}>
                <Button onClick={handleRetake} variant="outline">
                  Пройти снова
                </Button>
                <Button asChild>
                  <Link to="/resources">Изучить ресурсы</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link to="/progress">Сохранить результат</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard user={user}>
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Оценка эмоционального выгорания</h1>
            <p className={styles.description}>
              Оцените каждое утверждение по шкале от 0 (никогда) до 5 (всегда). Будьте честны с собой — это поможет
              получить точные результаты.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {assessmentQuestions.map((question, index) => (
              <div key={question.id} className={styles.question}>
                <div className={styles.questionCategory}>{getCategoryLabel(question.category)}</div>
                <div className={styles.questionText}>
                  {index + 1}. {question.question}
                </div>
                <div className={styles.scaleContainer}>
                  {[0, 1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className={styles.scaleOption}>
                      <input
                        type="radio"
                        id={`${question.id}-${value}`}
                        name={question.id}
                        value={value}
                        checked={answers[question.id] === value}
                        onChange={() => handleAnswerChange(question.id, value)}
                        required
                      />
                      <label htmlFor={`${question.id}-${value}`}>{value}</label>
                    </div>
                  ))}
                </div>
                <div className={styles.scaleLabels}>
                  <span>Никогда</span>
                  <span>Всегда</span>
                </div>
              </div>
            ))}

            <Button type="submit" className={styles.submitButton} disabled={Object.keys(answers).length < 10}>
              Получить результаты
            </Button>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
}