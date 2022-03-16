'use strict';

module.exports = {
    'allow-uncaught': false,
    'async-only': false,
    bail: false,
    'check-leaks': false,
    color: true,
    delay: false,
    diff: true,
    exit: false, // could be expressed as "'no-exit': true"
    extension: ['js'],
    // fgrep: something, // fgrep and grep are mutually exclusive
    //file: ['/path/to/some/file', '/path/to/some/other/file'],
    'forbid-only': false,
    'forbid-pending': false,
    'full-trace': false,
    global: ['jQuery', '$'],
    // grep: something, // fgrep and grep are mutually exclusive
    growl: false,
    ignore: ['/path/to/some/ignored/file'],
    'inline-diffs': false,
    // invert: false, // needs to be used with grep or fgrep
    jobs: 20,
    package: './package.json',
    parallel: true,
    recursive: false,
    reporter: 'spec',
    // 'reporter-option': ['configFile=multi-config.json'],
    require: '@babel/register',
    retries: 1,
    slow: '75',
    sort: false,
    spec: ['test/z_resourceManagement/statusChecker.js'], // the positional arguments!
    timeout: '5s', // same as "timeout: '15000'"
    // timeout: false, // same as "'no-timeout': true" or "timeout: 0"
    'trace-warnings': true, // node flags ok
    ui: 'bdd',
    'v8-stack-trace-limit': 100, // V8 flags are prepended with "v8-"
    watch: false,
    // 'watch-files': ['lib/**/*.js', 'test/**/*.js'],
    // 'watch-ignore': ['lib/vendor']
};