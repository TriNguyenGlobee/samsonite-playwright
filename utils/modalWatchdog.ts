import { Page } from "@playwright/test";
import { closeModalIfPresent } from "../utils/helpers";

export async function startModalWatchdog(page: Page, intervalMs = 3000) {
  let running = true;
  let loopPromise: Promise<void>;

  const loop = async () => {
    while (running) {
      try {
        if (page.isClosed()) {
          console.log("[Watchdog] Page is closed — stopping loop");
          running = false;
          break;
        }

        const browser = page.context()?.browser();
        if (!browser || !browser.isConnected()) {
          console.log("[Watchdog] Browser disconnected — stopping loop");
          running = false;
          break;
        }

        await closeModalIfPresent(page);
      } catch (e) {
        if (!/Target page.*closed/i.test(String(e))) {
          console.warn("[Watchdog] Error:", e);
        } else {
          console.log("[Watchdog] Page closed during loop — safe to ignore");
        }
        running = false;
        break;
      }

      await new Promise((r) => setTimeout(r, intervalMs));
    }
  };

  loopPromise = loop();

  return async () => {
    running = false;
    try {
      await loopPromise;
    } catch {
    }
  };
}
