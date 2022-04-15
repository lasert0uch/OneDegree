const browsers = process.env.BROWSERS === undefined ? ['Chrome'] : process.env.BROWSERS.split(', '); // ['Chrome', 'Firefox', 'Safari', 'Edge']
const browserVersions = process.env.VERSIONS === undefined ? ['latest'] : process.env.VERSIONS.split(', '); // ['latest', 'latest - 1']
const resolutions = process.env.RES === undefined ? ['1920x1080'] : process.env.RES.split(', '); // ['1920x1080', '1024x768', '1366x768']
const maxInst = process.env.BROWSER_INSTANCES === undefined ? 5 : +process.env.BROWSER_INSTANCES;
const testType = process.env.TYPE === undefined ? 'Local' : process.env.TYPE;
const chromeOnly = process.env.CHROME === undefined ? false : process.env.CHROME;

import devices from "./devices";

function getTime() {
    return new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
}

// ----------------------------- Capabilities Setup for BrowserStack or Local runs Only  ----------------------------- //

module.exports = function (environment) {
    // Environments are loaded into capabilities and read at runtime to open correct URL
    if (!process.env.BS) { // For local runs, Chrome Only, for each environment
        let arrObj = []
        environment.forEach(envir => arrObj.push({
            maxInstances: 5,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ["--window-size=1265,1030"],
                excludeSwitches: ['enable-logging'],
                prefs: { environment: envir },
            },
            acceptInsecureCerts: true,
        }))
        // return console.log(arrObj);
        return arrObj // Returns chrome capabilitiess for each environment
    } else {
        let newDevices = [];
        environment.forEach(envir => { // Loops through environments array for each 'devices' object and creates new array with 'prefs' for each environment
            devices.forEach(el => {
                el.prefs = {
                    environment: envir,
                }
                newDevices.push(Object.assign({}, el))
            })
        })
        let res = [...newDevices]; // spreads newDevices array objects into result array

        browsers.forEach(br => { // loops through each browser in 'browsers' array and adds specific capabilities
            environment.forEach(envir => { // Loops through environments array for each 'browsers' object and adds 'prefs' for each environment to each capability object
                resolutions.forEach(rs => { // Loops through resolutions array and creates object for each
                    let capability = {
                        browser: br,
                        resolution: rs,
                        browserName: `${br} - ${rs}`,
                        name: `${br}-${rs}`,
                        prefs: { environment: envir, },
                    };

                    if (br === 'Safari') {
                        if (rs === '1366x768') {
                            capability.resolution = '1280x960';
                            capability.name = `${br}-1280x960`;
                        }
                        capability.os = 'OS X';
                        capability['os_version'] = 'Big Sur';
                        res.push(capability); // Adds each object into the resuilts array
                    }

                    if (br !== 'Safari') {
                        capability.os = 'Windows';
                        capability['os_version'] = '11';
                        // capability['browserstack.selenium_version'] = '2.53.0'; // Not necessary at this time

                        browserVersions.forEach(ver => {
                            res.push({ ...capability, browser_version: ver }); // Adds each object into the resuilts array
                        })
                    }
                });
            });
        });

        res.forEach(el => { // Adds general cability values to all objects sent to BrowserStack
            el.maxInstances = maxInst;
            el.build = `1Degree - ${testType} - ${getTime()}`;
            el.project = '1Degree';
            el['browserstack.timezone'] = 'Los_Angeles';
            el['browserstack.idleTimeout'] = 180;
        })

        if (chromeOnly) {
            for (let i = res.length - 1; i >= 0; i--) {
                if (res[i].browser !== 'Chrome') {
                    res.splice(i, 1);
                }
            }
        }
        // console.log(res); // Log the Array of Objects sent to BrowserStack
        return res; // returns capabilities object for all devices, browsers, versions & resolutions for each environment
    }
};