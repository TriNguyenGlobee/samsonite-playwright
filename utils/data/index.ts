import path from "path";

const ENV = process.env.ENV || "dev";
const LOCALE = process.env.LOCALE || "jp";

export function loadTestData() {
  const dataPath = path.resolve(__dirname, `${ENV}/${LOCALE}/data.ts`);

  try {
    const data = require(dataPath);
    return data;
  } catch (err) {
    throw new Error(`Test data not found for ENV=${ENV}, LOCALE=${LOCALE}. Path tried: ${dataPath}`);
  }
}
