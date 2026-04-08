import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "~/components/ui/button/button";
import styles from "./install-prompt.module.css";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className={styles.installPrompt}>
      <div className={styles.content}>
        <Download className={styles.icon} />
        <div className={styles.textContent}>
          <p className={styles.title}>Установить приложение?</p>
          <p className={styles.description}>Работает офлайн, быстрый доступ</p>
        </div>
        <div className={styles.actions}>
          <Button onClick={handleInstall} size="sm" variant="default">
            Установить
          </Button>
          <button onClick={handleDismiss} className={styles.closeButton} aria-label="Закрыть">
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
