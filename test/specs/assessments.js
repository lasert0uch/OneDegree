import assessments from '../pages/assessments.page';

describe('Assessment-Tests', () => {

    it('Open-Plan-Assessment', async () => {
        await assessments.open('rbg', 'plan#assessments', 'demo:peoplefirst@');
    })

    it('Check-Page', async () => {
        await assessments.checkPage();
    })

    it('Create-Account', async () => {
        await assessments.createAccount(); // Generic Account (random)
    })

    assessments.diabetes.forEach((scenario, num) => {
        it(`Diabetes-Risk-Assessment-Scenario-#${num + 1}`, async () => {
            await assessments.diabetesRisk(scenario, num);
        })
    });

    assessments.hiv.forEach((scenario, num) => {
        it(`HIV-Risk-Assessment-Scenario-#${num + 1}`, async () => {
            await assessments.hivRisk(scenario, num);
        })
    });


})