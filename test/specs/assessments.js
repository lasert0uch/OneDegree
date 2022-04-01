import assessments from '../pages/assessments.page';
import help from '../helpers/helpers'
let org = false;
const user = {
    firstName: help.randomFirstNameFemale(),
    lastName: help.randomLastName(),
    email: `test.${help.generateRandomStringOfIntegers(10)}@example.com`,
    phone: help.randomPhoneNumber(),
    password: 'Password1*',
    loc: 'Los Angeles, CA, USA',
    org: 'SBCC Thrive LA', // null, 'SBCC Thrive LA', 'One Degree'
    position: 'Automation Wizard',
    lang: 'English',
    dobDay: '10',
    dobMonth: 'January',
    dobYear: '2001',
    gender: 'Female',
}

describe('Assessments', () => {

    it('Open-Assessments', async () => {
        await assessments.open('rbg', 'plan#assessments', 'demo:peoplefirst@'); // TODO: Use environment variables from wdio.conf.js file
    })

    it('Check-Assessments-Page', async () => {
        await assessments.checkPage()
        await browser.pause(3000)
    })

    it('Create-Account', async () => {
        org = await assessments.createAccount(user);
    })

    assessments.diabetes.forEach((scenario, num) => { // TODO: Build scenarios 'This is for someone else' - ALL
        it(`Diabetes-Risk-Scenario-#${num + 1}`, async () => {
            await assessments.diabetesRisk(scenario, num, org);
        })
    });

    assessments.depression.forEach((scenario, num) => {
        it(`Depression-Risk-Scenario-#${num + 1}-${scenario.title}`, async () => {
            await assessments.depressionRisk(scenario, num, org);
        })
    });

    assessments.food.forEach((scenario, num) => {
        it(`Food-Insecurity-Risk-Scenario-#${num + 1}-${scenario.title}`, async () => {
            await assessments.foodInsecurity(scenario, num, org);
        })
    });

    assessments.housing.forEach((scenario, num) => {
        it(`Housing-Insecurity-Risk-Scenario-#${num + 1}-${scenario.title}`, async () => {
            await assessments.housingInsecurity(scenario, num, org);
        })
    });

    assessments.calFreshMC.forEach((scenario, num) => { // TODO: Handle Multi-Scenario Navigation for non-afiliated users
        it(`CalFresh-Medi-Cal-Eligibility-Scenario-#${num + 1}-${scenario.title}`, async () => {
            await assessments.calFreshMediCal(scenario, num, org);
        })
    });

    assessments.hiv.forEach((scenario, num) => {
        it(`HIV-Risk-Scenario-#${num + 1}-${scenario.title}`, async () => {
            await assessments.hivRisk(scenario, num, org);
        })
    });


})