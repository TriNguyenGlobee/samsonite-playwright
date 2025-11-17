import { Page } from "@playwright/test";
import { closeModalIfPresent } from "../helpers/helpers";

export async function startModalWatchdog(page: Page, intervalMs = 3000) {
  let running = true;

  const loop = async () => {
    while (running) {
      try {
        await closeModalIfPresent(page);
      } catch (e) {
        console.warn("Modal watchdog error:", e);
      }
      await new Promise((r) => setTimeout(r, intervalMs));
    }
  };

  loop();

  return () => {
    running = false;
  };
}
