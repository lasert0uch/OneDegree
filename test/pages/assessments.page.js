import Base from './base.page';
import sel from '../selectors/assessments_diabetes-risk.sel';
import help from "../helpers/helpers"

const data = {
    firstName: help.randomFirstNameMale(),
    lastName: help.randomLastName(),
    email: `test.${help.generateRandomStringOfIntegers(10)}@example.com`,
    password: 'Password1*',
    loc: 'Los Angeles, CA, USA',
    org: 'One Degree',
    position: 'Automation Wizard',
    lang: 'English',
    dobDay: '10',
    dobMonth: 'January',
    dobYear: '2001',
    gender: 'Male',
    familyDiabetes: 'Yes',
    highBP: 'Yes',
    active: 'No',
    weight: '320',
    heightFt: '5',
    heightIn: '5',


}



class Assessments extends Base {

    constructor() {
        super();
        this.data = data;
    }

    async checkPage() {
        await expect(await $(sel.activeTab)).toHaveText('Assessments');
    }

    async diabetes() {
        await this.selectOneFromArray(await $$(sel.labelLinks), 'Diabetes Risk');
        await expect(await $(sel.txtDiabetes)).toHaveTextContaining(`Learn if you're at risk for Type 2 diabetes by answering a few questions.`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), 'This is for myself');

        // await $(sel.btnGetStarted).click();
        await expect(await $(sel.txtH3)).toHaveText('What is your date of birth?');
        const dob = await $$(sel.ddDOBSelectors);
        await dob[0].selectByVisibleText(data.dobDay);
        await dob[1].selectByVisibleText(data.dobMonth);
        await dob[2].selectByVisibleText(data.dobYear);
        await $(sel.btnContinue).click();
        await expect(await $(sel.txtH3)).toHaveText('What is your gender, as specified on your identification?');
        await this.selectOneFromArray(await $$(sel.rdoGenders), data.gender);
        await expect(await $(sel.txtH3)).toHaveText('Do you have a mother, father, sister, or brother with diabetes?');
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.familyDiabetes);
        await expect(await $(sel.txtH3)).toHaveText('Have you ever been diagnosed with high blood pressure?');
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.highBP);
        await expect(await $(sel.txtH3)).toHaveText('Are you physically active?');
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.active);
        await expect(await $(sel.txtH3)).toHaveText('How much do you weigh?');
        await $(sel.inputBox).setValue(data.weight);
        await $(sel.btnContinue).click();
        await expect(await $(sel.txtH3)).toHaveText('How tall are you?');
        await $$(sel.inputBox)[0].setValue(data.heightFt);
        await $$(sel.inputBox)[1].setValue(data.heightIn);
        await $(sel.btnContinue).click();
        await expect(await $(sel.endTitle)).toHaveText(`Here's what you said:`);
        await browser.pause(1000);
        await $(sel.btnResults).click();




        await browser.pause(5000);
        // await browser.debug();
    }

}


export default new Assessments
