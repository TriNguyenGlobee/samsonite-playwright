# 🎭 Playwright Automation Project
- Node.js (>=16)
- Git

## 🚀 Setting Guide
```bash
git clone https://github.com/TriNguyenGlobee/samsonite-playwright.git
cd samsonite-playwright
npm install
npx playwright install
```

# Generate a single result file to Allure Report
allure generate --single-file allure-results\report-mm-dd-yy --clean 
allure open index.html

## Report
- Generate Allure report
npm run report:generate

- Open Allure report
npm run report:open

- Clear old result (allure-results + allure-report)
npm run report:clean

# Run test
- Run all test:
npm run test

- Run a single test login.test.ts:
npm run test:login

- Run test with specified options: (example)
run-tests.bat jp stg tests/delivery
OR:
npx cross-env ENV=stg LOCALE=jp npx playwright test --project=chromium tests/delivery/login 
 
## Chrome 
- Run test with Chrome (ENV=dev) - default:
npm run test:chrome

- Run test with Chrome (ENV=stg):
npm run test:stg-chrome

## Firefox
- Run test with Firefox (ENV=dev) - default:
npm run test:firefox

- Run test with Firefox (ENV=stg):
npm run test:stg-firefox

## Webkit
- Run test with Webkit (ENV=dev) - default:
npm run test:webkit

- Run test with Webkit (ENV=stg):
npm run test:stg-webkit

## Run test-env.ts
- npx ts-node test-env.ts