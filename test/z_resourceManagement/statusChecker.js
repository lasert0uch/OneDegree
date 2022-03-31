import { expect } from 'chai';
import axios from 'axios';
import fs from 'fs';
import urls from './content/websites';

// * Basic Formula for Excel: =CONCAT("['OrgID: "&B2&"', '"&C2&"']") or =CONCAT("['OppID: "&B2&"', '"&C2&"']")

const isDebug = process.env.ISDEBUG === undefined ? false : process.env.ISDEBUG;

describe(`Check-Websites-Status`, function () {

    urls.forEach((site, i) => {

        describe(`${site[0]} - ${site[1]}`, function () {

            let status;
            let data;

            before((done) => {
                console.log(`Checking: ${site[0]} - ${site[1]}`); // Logging checking website
                axios.get(site[1])
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
                        console.log(`Error:    ${status} - ${site[0]} - ${site[1]}`);
                        if (isDebug) console.log(status); //for debug purposes
                    })
                    .then(function () {
                        // if (error && error.code === 'ETIMEDOUT') console.log(`Timeout:    ${status} - ${site[0]} - ${site[1]}`);
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

