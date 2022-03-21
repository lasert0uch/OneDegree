import assessments from '../pages/assessments.page';
const data = assessments.data;

describe('Assessment-Tests', () => {

    it('Open-Plan-Assessment', async () => {
        await assessments.open('rbg', 'plan#assessments', 'demo:peoplefirst@');
    })

    it('Check-Page', async () => {
        await assessments.checkPage();
    })

    it('Create-Account', async () => {
        await assessments.createAccount(data);
        // await browser.debug();
    })

    it('Diabetes-Risk-Assessment', async () => {
        await assessments.diabetes();
    })

    it('HIV-Risk-Assessment', async () => {
        await assessments.hivRisk();
    })

})