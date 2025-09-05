# 🎭 Playwright Automation Project
- Node.js (>=16)
- Git

## 🚀 Setting Guide
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
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
 
## Chrome 
- Run test with Chrome (ENV=qa) - default:
npm run test:chrome

- Run test with Chrome (ENV=dev):
npm run test:dev-chrome

## Firefox
- Run test with Firefox (ENV=qa) - default:
npm run test:firefox

- Run test with Firefox (ENV=dev):
npm run test:dev-firefox

## Webkit
- Run test with Webkit (ENV=qa) - default:
npm run test:webkit

- Run test with Webkit (ENV=dev):
npm run test:dev-webkit