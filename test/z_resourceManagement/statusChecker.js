import { expect } from 'chai';
import axios from 'axios';
import fs from 'fs';
import urls from './content/websites';

const isDebug = process.env.ISDEBUG === undefined ? false : process.env.ISDEBUG;

describe(`Check-Websites-Status`, function () {

    urls.forEach(site => {

        describe(site, function () {

            let status, data;

            before((done) => {
                axios.get(site)
                    .then(function (response) {
                        status = response.status;
                        data = response.data;
                        console.log(status);
                        if (isDebug) { //for debug purposes
                            console.log(data);
                        }
                    })
                    .catch(function (error) {
                        status = error.response.status;
                        data = error.response.data;
                        if (isDebug) console.log(response.status); //for debug purposes
                    })
                    .then(function () {
                        done();
                    });
            });

            it('Status is 200', function (done) {
                expect(status).to.be.equal(200);
                done();
            });

        });

    });

});

