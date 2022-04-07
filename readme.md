# WebdriverIO/MochaJS Project for 1Degree.org

This is an Async JavaScript WebdriverIO and MochaJS project with the potential to enable the capabilities for BrowserStack on several devices and browsers. The intention is for this to automation become a data-driven application driver and thoroughly test all data flows.

# Prerequisites

1.  NodeJS v.14+

2.  JDK 8+

## Getting Started

1.  Clone the repo

2.  run `npm install`in a terminal window

3.  run `npm test` (or `npm t`) to run active spec files listed in the `wdio.conf.js` file to execute on local browser `['Chrome']`

4.  run `BS=true USER=<Your-BrowserStack-UserId> KEY=<Your-BrowserStack-Key> BAIL=true npm t` - Can also be LambdaTest or SauceLabs data

### Notable Runtime Environment Variables for WebdriverIO:

- `LOGLEVEL=info` ...Level of logging verbosity: trace | debug | info | warn | error | silent (defaults to silent)
- `DBT=true` ...Stops at every test failure (defaults to false)
- `DBS=true` ...Stops at the end of every test suite (defaults to false)
- `BAIL=true` ...Aborts after first test failure (mocha "bail") - No more tests are run (defaults to false)
- `BS=true` ...Triggers run on BrowserStack (or similar platform) - Requires `USER=<Your-BrowserStack-UserId> KEY=<Your-BrowserStack-Key>`
- `BROWSERS=['Chrome', 'Safari', 'Edge']` ...Array of Browsers to be run on BrowserStack (Defaults as shown)
- `VERSIONS=['latest', 'latest - 1']` ...Versions to be run on BrowserStack (Defaults as shown)
- `RES=['1920x1080', '1024x768', '1366x768']` ...Resolutions to be run on BrowserStack (Defaults as shown)
- `MAX_INSTANCES=5` ...Global max instances that can run (Defaults to 5)
- `BROWSER_INSTANCES=5` ...Per Browser max instances that can run (Defaults as shown)
- `TYPE=Local` ...Denotes Type of Run to be logged on BrowserStack (text)
- `CHROME=true` ...When true and BS=true, will only run Chrome browsers on BrowserStack (Defaults to false)
- `RETRY_FAILURES=1` ...Will Re-Run spec files that fail for flaky tests (Defaults to 0)

## Website Checker - Returns positive and negative status codes for a list of websites

1.  run `npm run websites` to start the checking of all sites listed in `./z_resourceManagement/content/websites.js` file

- Massage Data in Excel with this formula (assuming ID and URL are available): `=CONCAT("['OrgID: "&B2&"', '"&C2&"']")` or `=CONCAT("['OppID: "&B2&"', '"&C2&"']")`
- output for `websites` run will be logged in the `output.txt` file
- `websites` run needs to happen on a server open to the internet (no site-blocking firewall or VPN)
