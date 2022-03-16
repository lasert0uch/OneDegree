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
    })

    it('Diabetes-Assessment', async () => {
        await assessments.diabetes();
    })

    // it('Click-Page-Two-Buttons', async () => {
    //     await assessments.buttons2();
    // })

})