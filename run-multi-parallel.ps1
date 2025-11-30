$locales = @("jp", "sg")

foreach ($loc in $locales) {
    Start-Process powershell -ArgumentList @(
        "-Command",
        "`$env:LOCALE='$loc'; `$env:ENV='stg'; `$env:ALLURE_RESULTS_DIR='allure-results-$loc'; npx playwright test --project=chromium tests/delivery --retries=2"
    )
    Write-Host "Started LOCALE: $loc"
}
