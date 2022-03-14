import Base from './base.page';
import sel from '../selectors/assessments_diabetes-risk.sel';



class Assessments extends Base {

    constructor() {
        super();
    }

    async checkPage() {
        await expect(await $(sel.activeTab)).toHaveText('Assessments');
    }

    async diabetes() {
        await this.selectOneFromArray(await $$(sel.labelLinks), 'Diabetes Risk');
        await expect(await $(sel.txtDiabetes)).toHaveText(`Learn if you're at risk for Type 2 diabetes by answering a few questions.
Adapted from the diabetes risk test published by the American Diabetes Association.`);
        await $(sel.btnGetStarted).click();
        await expect(await $(sel.txtDOB)).toHaveText('What is your date of birth?');
        const dob = await $$(sel.ddDOBSelectors);
        await dob[0].selectByVisibleText('10');
        await dob[1].selectByVisibleText('October');
        await dob[2].selectByVisibleText('2001');




        await browser.debug();
    }

}


export default new Assessments
