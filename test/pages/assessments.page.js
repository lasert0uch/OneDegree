import Base from './base.page';
import sel from '../selectors/assessments_diabetes-risk.sel';
import help from "../helpers/helpers"

const data = {
    firstName: help.randomFirstNameFemale(),
    lastName: help.randomLastName(),
    email: `test.${help.generateRandomStringOfIntegers(10)}@example.com`,
    password: 'Password1*',
    loc: 'Los Angeles, CA, USA',
    org: null, // 'SBCC Thrive LA', 'One Degree'
    position: 'Automation Wizard',
    lang: 'English',
    dobDay: '10',
    dobMonth: 'January',
    dobYear: '2001',
    gender: 'Female',
    // Diabetes Risk
    familyDiabetes: 'Yes',
    highBP: 'Yes',
    active: 'No',
    weight: '320',
    heightFt: '5',
    heightIn: '5',
    // HIV Risk
    hivAids: 'No',
    sexuallyActive: 'Previously. I have not had sex for at least 3 months.', // 'Yes', 'No', 'Previously. I have not had sex for at least 3 months.'
    hadStds: ['Chlamydia', 'Gonorrhea', 'Syphilis'], // ['Chlamydia', 'Gonorrhea','Syphilis','None of the above']
    sexWorker: 'Yes',
    partnerSexWithMen: 'Yes', // Only asked if Female
    methUse: 'Yes',
    ivDrugs: 'Yes',
    zipCode: '90001',

}



class Assessments extends Base {

    constructor() {
        super();
        this.data = data;
    }

    async checkPage() {
        await expect(await $(sel.activeTab)).toHaveText(`Assessments`);
    }

    async backToAssessments() {
        await $(sel.mainMenu).click();
        await browser.pause(500);
        await $(sel.menuAssessments).click();
        await this.checkPage();

    }

    async diabetes() {
        await this.selectOneFromArray(await $$(sel.labelLinks), `Diabetes Risk`);
        if (data.org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`Learn if you're at risk for Type 2 diabetes by answering a few questions.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), `This is for myself`);
        } else await $(sel.btnGetStarted).click();
        await expect(await $(sel.txtH3)).toHaveText(`What is your date of birth?`);
        const dob = await $$(sel.ddDOBSelectors);
        await dob[0].selectByVisibleText(data.dobDay);
        await dob[1].selectByVisibleText(data.dobMonth);
        await dob[2].selectByVisibleText(data.dobYear);
        await $(sel.btnContinue).click();
        await expect(await $(sel.txtH3)).toHaveText(`What is your gender, as specified on your identification?`);
        await this.selectOneFromArray(await $$(sel.rdoGenders), data.gender);
        await expect(await $(sel.txtH3)).toHaveText(`Do you have a mother, father, sister, or brother with diabetes?`);
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.familyDiabetes);
        await expect(await $(sel.txtH3)).toHaveText(`Have you ever been diagnosed with high blood pressure?`);
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.highBP);
        await expect(await $(sel.txtH3)).toHaveText(`Are you physically active?`);
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.active);
        await expect(await $(sel.txtH3)).toHaveText(`How much do you weigh?`);
        await $(sel.numberBox).setValue(data.weight);
        await $(sel.btnContinue).click();
        await expect(await $(sel.txtH3)).toHaveText(`How tall are you?`);
        await $$(sel.numberBox)[0].setValue(data.heightFt);
        await $$(sel.numberBox)[1].setValue(data.heightIn);
        await $(sel.btnContinue).click();
        await expect(await $(sel.endTitle)).toHaveText(`Here's what you said:`);
        await browser.pause(1000);
        await $(sel.btnResults).click();
        await browser.pause(5000);
        await this.backToAssessments();
        // await browser.debug();
    }

    async hivRisk() {
        await this.selectOneFromArray(await $$(sel.labelLinks), `HIV Risk`);
        if (data.org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`Is PrEP right for me? PrEP might be right for you if you are HIV negative and are at high risk of being exposed to HIV.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), 'This is for myself');
        } else await $(sel.btnGetStarted).click();
        await expect(await $(sel.txtH3)).toHaveText(`Have you ever been diagnosed with HIV or AIDS?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.hivAids);
        await expect(await $(sel.txtH3)).toHaveText(`Are you sexually active?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.sexuallyActive);
        await expect(await $(sel.txtH3)).toHaveText(`Have you ever had (check all that apply)`);
        await this.selectMultipleFromArray(await $$(sel.rdoCheckList), data.hadStds);
        await $(sel.btnContinue).click();
        await expect(await $(sel.txtH3)).toHaveText(`Have you ever exchanged sex for money, drugs, or other goods?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.sexWorker);
        await expect(await $(sel.txtH3)).toHaveText(`Are you male or female?`);
        await browser.pause(200);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.gender);
        if (data.gender === 'Female') {
            await expect(await $(sel.txtH3)).toHaveText(`If your partner is male, does he also have sex with men?`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), data.partnerSexWithMen);
        }
        await expect(await $(sel.txtH3)).toHaveText(`Have you used Methamphitamines (ex: speed, crystal) in the past year?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.methUse);
        await expect(await $(sel.txtH3)).toHaveText(`Do you use injection drugs?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.ivDrugs);
        await expect(await $(sel.txtH3)).toHaveText(`Where are you located? This information lets us know which services are closest to you. Zip code (Required)`);
        await $(sel.inputBox).setValue(data.zipCode);
        await $(sel.btnContinue).click();
        await expect(await $(sel.endTitle)).toHaveText(`Here's what you said:`);
        await $(sel.btnResults).click();
        await browser.pause(5000);
        await this.backToAssessments();
    }


}


export default new Assessments
