import { useEffect, useState } from "react";

export function useServiceWorker() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    // Register service worker
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => {
        setRegistration(reg);

        // Check for updates
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });

        // Check for updates every hour
        setInterval(
          () => {
            reg.update();
          },
          60 * 60 * 1000
        );
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }, []);

  const updateApp = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  };

  return { registration, updateAvailable, updateApp };
}
