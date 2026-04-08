import { useEffect, useState } from "react";
import { Link } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Header } from "~/components/header";
import { AuthGuard } from "~/components/auth-guard";
import { getUser } from "~/utils/auth.server";
import { getAssessmentHistory, getLastAssessmentResult, type AssessmentResult } from "~/utils/storage";
import type { Route } from "./+types/home";
import styles from "./home.module.css";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  return { user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const [lastResult, setLastResult] = useState<AssessmentResult | null>(null);
  const [history, setHistory] = useState<AssessmentResult[]>([]);

  // Загружаем данные из localStorage при монтировании
  useEffect(() => {
    const last = getLastAssessmentResult();
    const all = getAssessmentHistory();
    setLastResult(last);
    setHistory(all);
  }, []);

  // Вычисляем изменение прогресса (разница между последним и предпоследним)
  const getProgressChange = (): number | null => {
    if (history.length < 2) return null;
    const prev = history[history.length - 2].score;
    const curr = history[history.length - 1].score;
    return curr - prev;
  };

  const progressChange = getProgressChange();
  const progressText = progressChange !== null
    ? `За последние недели ваш уровень выгорания ${progressChange < 0 ? 'снизился' : 'повысился'} на ${Math.abs(progressChange)} пунктов.`
    : 'Пройдите тест, чтобы увидеть динамику.';

  // Подготавливаем данные для графика: преобразуем даты в читаемый формат
  const chartData = history.map(item => ({
    date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
    score: item.score,
  }));

  return (
    <AuthGuard user={user}>
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          {/* Приветствие */}
          <div className={styles.welcome}>
            <h1 className={styles.title}>Добро пожаловать в ReBalance</h1>
            <p className={styles.subtitle}>
              Ваш персональный помощник в борьбе с эмоциональным выгоранием. Отслеживайте своё состояние, получайте поддержку и восстанавливайте баланс.
            </p>
          </div>

          {/* Два блока: состояние и прогресс */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h2 className={styles.statTitle}>Ваше состояние</h2>
              {lastResult ? (
                <>
                  <p className={styles.statValue}>
                    Последняя оценка: <strong>{new Date(lastResult.date).toLocaleDateString('ru-RU')}</strong>
                  </p>
                  <p className={styles.statValue}>
                    Уровень выгорания: <strong>{lastResult.score}/50</strong>
                  </p>
                </>
              ) : (
                <p className={styles.statPlaceholder}>Нет данных. Пройдите тест.</p>
              )}
            </div>
            <div className={styles.statCard}>
              <h2 className={styles.statTitle}>Ваш прогресс</h2>
              <p className={styles.statValue}>{progressText}</p>
            </div>
          </div>

          {/* Быстрые действия */}
          <div className={styles.actions}>
            <h2 className={styles.actionsTitle}>Быстрые действия</h2>
            <div className={styles.actionsGrid}>
              <Link to="/assessment" className={styles.actionCard}>
                <h3>Пройти тест</h3>
                <p>Оцените свой текущий уровень эмоционального выгорания и получите персональные рекомендации.</p>
              </Link>
              <Link to="/resources" className={styles.actionCard}>
                <h3>Изучить ресурсы</h3>
                <p>Доступ к статьям, упражнениям и медитациям для восстановления и профилактики.</p>
              </Link>
              <Link to="/progress" className={styles.actionCard}>
                <h3>Отследить прогресс</h3>
                <p>Ведите дневник настроения и наблюдайте за динамикой вашего состояния.</p>
              </Link>
            </div>
          </div>

          {/* График динамики */}
          {history.length > 0 && (
            <div className={styles.chartSection}>
              <h2 className={styles.chartTitle}>Динамика за последние недели</h2>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis domain={[0, 50]} stroke="#64748b" />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#6e56cf" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}