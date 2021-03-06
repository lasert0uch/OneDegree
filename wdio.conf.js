let fullName, errorMsg;
const genCap = require('./capabilities/generate-capabilities');
const debugTest = process.env.DBT === 'true' ? true : false; // DBT=true Stops at every test failure
const debugSuite = process.env.DBS === 'true' ? true : false; // DBS=true Stops at the end of every test suite
const mochaBail = process.env.BAIL === 'false' ? false : true; // Abort ("bail") after first test failure
const logging = process.env.LOGLEVEL === undefined ? 'silent' : process.env.LOGLEVEL; // Level of logging verbosity: trace | debug | info | warn | error | silent
const environment = process.env.ENV === undefined ? ['Chavez', 'Demo', 'Greta', 'Parks', 'RBG', 'WWW'] : process.env.ENV.split(', '); // Environment Variables to Run (array) - ['Chavez', 'Davis', 'Demo', 'Floyd', 'Greta', 'Parks', 'RBG', 'WWW', 'local']

const config = {
    //
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/referrals.js',
        './test/specs/assessments.js',
        './test/specs/collections.js',
        // './test/specs/resources.js',
        // './test/specs/od-la.js',
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // Global Max Instances
    maxInstances: process.env.MAX_INSTANCES === undefined ? 5 : +process.env.MAX_INSTANCES,
    //
    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: process.env.RETRY_FAILURES === undefined ? 0 : +process.env.RETRY_FAILURES,
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
    capabilities: genCap(environment),
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: logging,
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'https://www.1degree.org',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 15000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['chromedriver'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: ['spec', ['allure', { outputDir: 'temp/allure-results' }]],
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        require: ['@babel/register'],
        ui: 'bdd',
        timeout: 600000, // 10min
        bail: mochaBail, // Abort ("bail") spec after first test failure [boolean]
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    beforeSession: function (config, capabilities, specs) {
        if (process.env.BS === 'true') {
            let spec = specs[0].slice(specs[0].indexOf('specs') + 6, -3);
            spec = spec[0].toUpperCase() + spec.slice(1);
            capabilities.name += `-${spec}-${capabilities.prefs.environment}`;
        }
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    before: async function (capabilities, specs) {
        // if (capabilities.os === 'Windows' || capabilities.os === 'OS X' || process.env.BS !== 'true') {
        if (capabilities.os === 'Windows' || capabilities.os === 'OS X' && process.env.BS !== 'true') {
            await browser.maximizeWindow();
        }
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {Object}  test             test object
     * @param {Object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {Any}     result.result    return object of test function
     * @param {Number}  result.duration  duration of test
     * @param {Boolean} result.passed    true if test has passed, otherwise false
     * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed && !test.pending) {
            errorMsg = error.toString().replace(/\n|<|>|'/gi, '').replace('Error: ', '');
            // errorMsg = error.toString().replace(/\n|<|>|'|`|"|:|\$/gi, '').replace('Error- ', '');
            console.log(errorMsg);
            //save a screenshot
            fullName = `${test.parent}-${test.title}`;
            await browser.saveScreenshot(`./temp/screenshots/${fullName}.png`);
            if (process.env.BS === 'true') {
            }

            //test-level debug feature
            if (debugTest) {
                await browser.debug();
            }
        }
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    afterSuite: async function (suite) {
        if (debugSuite) {
            await browser.debug();
        }
    },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: async function (result, capabilities, specs) {
        if (process.env.BS === 'true') {
            if (fullName === undefined || fullName === 'undefined') fullName = '--Unknown Error, or Timeout Exceeded';
            if (result === 0) {
                console.log('Setting BrowserStack session status to "Good"...');
                await browser.executeScript(`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Passed-on-${capabilities.prefs.environment}"}}`, [result]);
            } else {
                console.log('Setting BrowserStack session status to "Bad"...');
                await browser.executeScript(`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${fullName}"}}`, [result]);
            }
        }
    },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}

if (process.env.BS === 'true') {
    config.user = process.env.USER;
    config.key = process.env.KEY;
}

exports.config = config;
