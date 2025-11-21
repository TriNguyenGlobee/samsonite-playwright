$locales = @("jp", "sg", "tw", "ph")

foreach ($loc in $locales) {
    Write-Host "=== Running LOCALE: $loc ==="

    $env:LOCALE = $loc
    $env:ENV = "stg"
    $env:ALLURE_RESULTS_DIR = "allure-results-$loc"

    npx playwright test --project=chromium tests/delivery --retries=2
}