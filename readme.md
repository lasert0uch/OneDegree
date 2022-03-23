# WebdriverIO/MochaJS Project for 1Degree.org

This is an Async JavaScript WebdriverIO and MochaJS project with the potential to enable the capabilities for BrowserStack on several devices and browsers. The intention is for this to automation become a data-driven application driver and thoroughly test all data flows.

# Prerequisites

1.  NodeJS v.14+

2.  JDK 8+

## Getting Started

1.  Clone the repo

2.  run `npm install`in a terminal window

3.  run `npm test` (or `npm t`) to run active spec files listed in the `wdio.conf.js` file

4.  run `npm run websites` to start the checking of all sites listed in `./z_resourceManagement/content/websites.js` file

- output for `websites` run will be logged in the `output.txt` file
- `websites` run needs to happen on a server open to the internet (no site-blocking firewall or VPN)
