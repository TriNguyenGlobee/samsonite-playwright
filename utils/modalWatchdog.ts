import { Page } from "@playwright/test";
import { closeModalIfPresent } from "../utils/helpers";

export async function startModalWatchdog(page: Page, intervalMs = 3000) {
  let running = true;
  let loopPromise: Promise<void>;

  const loop = async () => {
    while (running) {
      try {
        if (page.isClosed()) {
          console.log("[Watchdog] Page closed → stop loop");
          running = false;
          break;
        }

        const browser = page.context()?.browser();
        if (!browser || !browser.isConnected()) {
          console.log("[Watchdog] Browser disconnected → stop loop");
          running = false;
          break;
        }

        await closeModalIfPresent(page);
      } catch (e) {
        if (!/Target page.*closed/i.test(String(e))) {
          console.warn("[Watchdog] Error:", e);
        }
        running = false;
        break;
      }

      await new Promise((r) => setTimeout(r, intervalMs));
    }
  };

  loopPromise = loop();

  // Hàm dừng watchdog
  return async () => {
    running = false;
    try {
      await Promise.race([
        loopPromise,
        new Promise((resolve) => setTimeout(resolve, 2500)), // timeout để đảm bảo không treo
      ]);
    } catch {
      console.log("[Watchdog] stop() ignored error");
    }
  };
}
