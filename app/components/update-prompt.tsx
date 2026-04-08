import { useServiceWorker } from "~/hooks/use-service-worker";
import { Button } from "~/components/ui/button/button";
import styles from "./update-prompt.module.css";

export function UpdatePrompt() {
  const { updateAvailable, updateApp } = useServiceWorker();

  if (!updateAvailable) {
    return null;
  }

  return (
    <div className={styles.updatePrompt}>
      <div className={styles.content}>
        <p className={styles.text}>Доступно обновление приложения!</p>
        <Button onClick={updateApp} size="sm" variant="default">
          Обновить
        </Button>
      </div>
    </div>
  );
}
