import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Header } from "~/components/header";
import { AuthGuard } from "~/components/auth-guard";
import { Button } from "~/components/ui/button/button";
import { Slider } from "~/components/ui/slider/slider";
import { Textarea } from "~/components/ui/textarea/textarea";
import { getUser } from "~/utils/auth.server";
import { getUserProgress } from "~/services/user.server";
import { progressEntries, getMoodLabel, getMoodColor, type ProgressEntry } from "~/data/progress";
import type { Route } from "./+types/progress";
import styles from "./progress.module.css";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  let userProgress = null;
  
  if (user) {
    userProgress = getUserProgress(user.id);
  }
  
  return { user, userProgress };
}

export default function Progress({ loaderData }: Route.ComponentProps) {
  const { user, userProgress } = loaderData;
  const [selectedMood, setSelectedMood] = useState<ProgressEntry["mood"]>("okay");
  const [burnoutLevel, setBurnoutLevel] = useState([20]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging progress:", { mood: selectedMood, level: burnoutLevel[0], notes });
    setNotes("");
  };

  const chartData = progressEntries.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("ru-RU", { month: "short", day: "numeric" }),
    level: entry.burnoutLevel,
  }));

  const moods: ProgressEntry["mood"][] = ["great", "good", "okay", "low", "poor"];

  return (
    <AuthGuard user={user}>
      <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Отслеживание прогресса</h1>
          <p className={styles.description}>
            Регулярно фиксируйте свое состояние и наблюдайте за динамикой восстановления
          </p>
        </div>

        <div className={styles.logSection}>
          <h2 className={styles.sectionTitle}>Записать текущее состояние</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Как вы себя чувствуете?</label>
              <div className={styles.moodButtons}>
                {moods.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    className={`${styles.moodButton} ${selectedMood === mood ? styles.active : ""}`}
                  >
                    {getMoodLabel(mood)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Уровень выгорания (0-50)</label>
              <Slider
                value={burnoutLevel}
                onValueChange={setBurnoutLevel}
                max={50}
                step={1}
                className={styles.slider}
              />
              <div className={styles.sliderValue}>{burnoutLevel[0]}</div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Заметки (необязательно)</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Что помогло сегодня? Какие были трудности?"
                rows={3}
              />
            </div>

            <Button type="submit">Сохранить запись</Button>
          </form>
        </div>

        <div className={styles.chartSection}>
          <h2 className={styles.sectionTitle}>Динамика уровня выгорания</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-6)" />
                <XAxis dataKey="date" stroke="var(--color-neutral-11)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--color-neutral-11)" style={{ fontSize: "12px" }} domain={[0, 50]} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-neutral-1)",
                    border: "1px solid var(--color-neutral-6)",
                    borderRadius: "var(--radius-2)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="var(--color-accent-9)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-accent-9)", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.historySection}>
          <h2 className={styles.sectionTitle}>История записей</h2>
          <div className={styles.historyList}>
            {progressEntries
              .slice()
              .reverse()
              .map((entry) => (
                <div key={entry.id} className={styles.historyItem}>
                  <div className={styles.historyDate}>
                    {new Date(entry.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className={styles.historyDetails}>
                    <div className={styles.historyScore}>Уровень: {entry.burnoutLevel}</div>
                    <div className={styles.historyMood} style={{ background: getMoodColor(entry.mood) + "20" }}>
                      {getMoodLabel(entry.mood)}
                    </div>
                  </div>
                  {entry.notes && <div className={styles.historyNotes}>{entry.notes}</div>}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}
