import Base from './base.page';
import sel from '../selectors/assessments.sel';
import scenarios from '../data/assessments.data';

class Assessments extends Base {

    constructor() {
        super();
        this.diabetes = scenarios.Diabetes;
        this.hiv = scenarios.HIV;
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

    async hivRisk(data, i, org) {
        await $(sel.hivRisk).click();
        if (i > 0) {
            await browser.pause(3000);
            await $(sel.restartAssessment).waitForDisplayed();
            await $(sel.restartAssessment).click();
        }
        if (org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`Is PrEP right for me? PrEP might be right for you if you are HIV negative and are at high risk of being exposed to HIV.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), 'This is for myself');
            if (i > 0) await $(sel.btnYes).click();
        } else {
            await $(sel.btnGetStarted).click();
            if (i > 0) await $(sel.btnYes).click();
        }
        await expect(await $(sel.txtH3)).toHaveText(`Have you ever been diagnosed with HIV or AIDS?`); // Question #1
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.hivAids);
        if (data.hivAids !== 'Yes') {
            await expect(await $(sel.txtH3)).toHaveText(`Are you sexually active?`); // Question #2
            await this.selectOneFromArray(await $$(sel.rdoButtons), data.sexuallyActive);
            if (data.sexuallyActive === 'Yes') {
                await expect(await $(sel.txtH3)).toHaveText(`How many total sexual partners have you had within the past 3 months?`); // Question #2a
                await $(sel.numberBox).setValue(data.sexPartnersTotal);
                await $(sel.btnContinue).click();
                await expect(await $(sel.txtH3)).toHaveText(`How many new sexual partners have you had within the past 3 months?`); // Question #2b
                await $(sel.numberBox).setValue(data.sexPartnersNew);
                await $(sel.btnContinue).click();
                await expect(await $(sel.txtH3)).toHaveText(`How many sexual partners have you met through dating app(s) within the past 3 months?`); // Question #2c
                await $(sel.numberBox).setValue(data.sexPartnersDatingApp);
                await $(sel.btnContinue).click();
                await expect(await $(sel.txtH3)).toHaveText(`Have you had sex with an HIV positive partner(s) within the past 3 months?`); // Question #3
                await this.selectOneFromArray(await $$(sel.rdoButtons), data.hivPosPartners);
                if (data.hivPosPartners === 'Yes') {
                    await expect(await $(sel.txtH3)).toHaveText(`How many HIV positive partners have you had within the past 3 months ?`); // Question #3a
                    await $(sel.numberBox).setValue(data.hivPosPartnersNum);
                    await $(sel.btnContinue).click();
                }
                await expect(await $(sel.txtH3)).toHaveText(`Do you always wear condoms when having sex?`); // Question #4
                await this.selectOneFromArray(await $$(sel.rdoButtons), data.condomsAlways);
                if (data.condomsAlways === 'No') {
                    await expect(await $(sel.txtH3)).toHaveText(`The partner receiving the penis in the anus is having anal receptive sex. Have you had condomless anal receptive sex?`); // Question #4a
                    await this.selectOneFromArray(await $$(sel.rdoButtons), data.condomlessAnalRec);
                    await expect(await $(sel.txtH3)).toHaveText(`Have you had sex while being "high" or under the influence of drugs or alcohol?`); // Question #4b
                    await this.selectOneFromArray(await $$(sel.rdoButtons), data.sexOnDrugs);
                }
            }
            if (data.sexuallyActive !== 'No') {
                await expect(await $(sel.txtH3)).toHaveText(`Have you ever had (check all that apply)`); // Question #5
                await this.selectMultipleFromArray(await $$(sel.rdoCheckList), data.hadStds);
                await $(sel.btnContinue).click();
                await expect(await $(sel.txtH3)).toHaveText(`Have you ever exchanged sex for money, drugs, or other goods?`); // Question #6
                await this.selectOneFromArray(await $$(sel.rdoButtons), data.sexWorker);
                await expect(await $(sel.txtH3)).toHaveText(`Are you male or female?`); // Question #7
                await this.selectOneFromArray(await $$(sel.rdoButtons), data.gender);
                if (data.gender === 'Female') {
                    await expect(await $(sel.txtH3)).toHaveText(`If your partner is male, does he also have sex with men?`); // Question #7a
                    await this.selectOneFromArray(await $$(sel.rdoButtons), data.partnerSexWithMen);
                }
            }
            await expect(await $(sel.txtH3)).toHaveText(`Have you used Methamphitamines (ex: speed, crystal) in the past year?`); // Question #8
            await this.selectOneFromArray(await $$(sel.rdoButtons), data.methUse);
            await expect(await $(sel.txtH3)).toHaveText(`Do you use injection drugs?`); // Question #9
            await this.selectOneFromArray(await $$(sel.rdoButtons), data.ivDrugs);
            await expect(await $(sel.txtH3)).toHaveText(`Where are you located? This information lets us know which services are closest to you. Zip code (Required)`); // Question #10
            await $(sel.inputBox).setValue(data.zipCode);
            await $(sel.btnContinue).click();
        }
        await expect(await $(sel.endTitle)).toHaveText(`Here's what you said:`);
        await $(sel.btnResults).click();
        await browser.pause(5000);
        await this.backToAssessments();
    }


    async diabetesRisk(data, i, org) {
        await $(sel.diabetes).click();
        if (org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`Learn if you're at risk for Type 2 diabetes by answering a few questions.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), `This is for myself`);
            if (i > 0) await $(sel.btnYes).click();
        } else {
            await $(sel.btnGetStarted).click();
            if (i > 0) await $(sel.btnYes).click();
        }
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
    }



}


export default new Assessments
