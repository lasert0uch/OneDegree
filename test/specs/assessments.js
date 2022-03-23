import assessments from '../pages/assessments.page';
let org = false;

describe('Assessments', () => {

    it('Open-Assessments', async () => {
        await assessments.open('rbg', 'plan#assessments', 'demo:peoplefirst@');
    })

    it('Check-Assessments-Page', async () => {
        await assessments.checkPage()
    })

    it('Create-Account', async () => {
        org = await assessments.createAccount(); // Generic Account (random)
    })

    assessments.diabetes.forEach((scenario, num) => { // TODO: Build scenarios 'This is for someone else'
        it(`Diabetes-Risk-Scenario-#${num + 1}`, async () => {
            await assessments.diabetesRisk(scenario, num, org);
        })
    });

    assessments.hiv.forEach((scenario, num) => { // TODO: Build scenarios 'This is for someone else'
        it(`HIV-Risk-Scenario-#${num + 1}-${scenario.title}`, async () => {
            await assessments.hivRisk(scenario, num, org);
        })
    });


})