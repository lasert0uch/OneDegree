import { expect } from 'chai';
import axios from 'axios';
import fs from 'fs';
import urls from './content/websites';

const isDebug = process.env.ISDEBUG === undefined ? false : process.env.ISDEBUG;

describe(`Check-Websites-Status`, function () {

    urls.forEach((site, i) => {

        describe(site, function () {

            let status;
            let data;

            before((done) => {
                console.log(`Checking: ${i + 1} - ${site}`); // Logging checking website
                axios.get(site)
                    .then(function (response) {
                        status = response.status;
                        data = response.data;
                        // console.log(`Result:   ${i + 1} - ${status} - ${site}`); // Not logging positive results
                        if (isDebug) { //for debug purposes
                            console.log(data);
                        }
                    })
                    .catch(function (error) {
                        status = error.response.status;
                        data = error.response.data;
                        console.log(`Error:    ${i + 1} - ${status} - ${site}`);
                        if (isDebug) console.log(status); //for debug purposes
                    })
                    .then(function () {
                        done();
                    });
            });

            it('Status-Should-Be-200:', function (done) {
                expect(status).to.be.equal(200);
                done();
            });

        });

    });

});

