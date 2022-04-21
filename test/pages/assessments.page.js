import Base from './base.page';
import sel from '../selectors/assessments.sel';
import scenarios from '../data/assessments.data';

class Assessments extends Base {

    constructor() {
        super();
        this.diabetes = scenarios.Diabetes;
        this.depression = scenarios.depression;
        this.food = scenarios.food;
        this.housing = scenarios.housing;
        this.calFreshMC = scenarios.calFreshMC;
        this.hiv = scenarios.HIV;
        this.housingHelper = scenarios.housingHelper;
        this.covid19 = scenarios.covid19;
    }


    async sarsCov2(data, i, org) {
        await $(sel.covid19).click();
        this.busyCheck();
        if (i > 0) {
            await browser.pause(3000);
            await $(sel.hhRestartAssessment).waitForDisplayed();
            await $(sel.hhRestartAssessment).click();
        }
        this.busyCheck();
        await expect(await $(sel.txtH1)).toHaveTextContaining(`Welcome to the COVID-19 Resource Finder!`);
        await this.selectMultipleByInnerTextFromDOM(sel.hhMultiBtn, data.resources);
        await $(sel.hhBtnNext).click();
        this.busyCheck();
        await expect(await $(sel.txtH1)).toHaveTextContaining(`Where are you located?`);
        await $(sel.hhLocation).setValue(data.cityOrZipCode);
        await browser.pause(2000);
        await $(`//span[text()='${data.cityOrZipCode}']`).click();
        await browser.pause(1000);
        await $(sel.hhBtnNext).click();
        this.busyCheck();
        await browser.waitUntil(async () => (await $(sel.txtH1).getText()) === 'COVID-19 Resource Recommendations',
            {
                timeout: 15000,
                timeoutMsg: 'COVID-19 Results took longer than 15s to display'
            }
        );
        await browser.pause(2000);
        const titles = await $$(`//h2`);
        for (const item of titles) {
            await item.scrollIntoView();
            await browser.pause(300);
        }
        await this.backToAssessments();
    }

    async hHelper(data, i, org) {
        await $(sel.housingHelper).click();
        this.busyCheck();
        if (i > 0) {
            await browser.pause(3000);
            await $(sel.hhRestartAssessment).waitForDisplayed();
            await $(sel.hhRestartAssessment).click();
        }
        this.busyCheck();
        await expect(await $(sel.txtH1)).toHaveTextContaining(`Welcome to the Housing Helper`);
        await expect(await $(sel.txtH3)).toHaveTextContaining(`Do you currently have housing?`);
        await $(`//button[contains(text(),'${data.currentlyHaveHousing}')]`).click();
        await $(sel.hhBtnNext).click();
        this.busyCheck();

        await expect(await $(sel.txtH1)).toHaveTextContaining(`Tell us about yourself`);
        await this.selectMultipleFromArray(await $$(sel.hhMultiBtn), data.currentSituation);
        if (data.age) await $(sel.hhDDAge).selectByVisibleText(data.age);
        if (data.children) await $(`//button[contains(text(),'${data.children}')]`).click();
        await $(sel.hhBtnNext).click();
        this.busyCheck();

        await expect(await $(sel.txtH1)).toHaveTextContaining(`Are you facing any of these issues?`);
        await this.selectMultipleFromArray(await $$(sel.hhMultiBtn), data.issues3);
        await $(sel.hhBtnNext).click();
        this.busyCheck();

        await expect(await $(sel.txtH1)).toHaveTextContaining(`Where are you located?`);
        await $(sel.hhLocation).setValue(data.cityOrZipCode);
        await browser.pause(2000);
        await $(`//span[contains(text(),'${data.cityOrZipCode}')]`).click();
        await browser.pause(3000);
        await $(sel.hhBtnNext).click();
        this.busyCheck();
        await browser.waitUntil(async () => await $(sel.hhStep1).isDisplayed(),
            {
                timeout: 45000,
                timeoutMsg: 'Housing Helper Results took longer than 45s to display'
            }
        );
        await browser.pause(5000);
        await $(sel.hhStep1).click();
        await browser.pause(200)
        await $(sel.hhStep2).click();
        await browser.pause(200)
        await $(sel.hhStep3).click();
        await browser.pause(200)
        await this.backToAssessments();
    }



    async calFreshMediCal(data, i, org) {
        await $(sel.calFreshMediCal).click();
        this.busyCheck();
        if (i > 0 && org) {
            await browser.pause(3000);
            await $(sel.restartAssessment).waitForDisplayed();
            await $(sel.restartAssessment).click();
            this.busyCheck();
        } else if (i > 0 && !org) {
            await browser.pause(3000);
            await $(sel.btnEditAnswers).waitForDisplayed();
            await $(sel.btnEditAnswers).click();
            this.busyCheck();
        }
        if (org) {
            this.busyCheck();
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`You and your family might qualify for CalFresh and/or Medi-Cal.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), `This is for myself`);
            if (i > 0) await $(sel.btnYes).click();
        } else if (i === 0) {
            await $(sel.btnGetStarted).click();
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
        }
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(`What is the zip code where you live?`);
        await expect(await $(sel.txtH3)).toHaveText(`What is the zip code where you live?`);
        await $(sel.inputBox).setValue(data.zipCode);
        await $(sel.btnContinue).click();
        this.busyCheck();

        if (i > 0 && !org) await this.editAnswers(`What county do you live in?`);
        await expect(await $(sel.txtH3)).toHaveText(`What county do you live in?`);
        await $(sel.ddSelect).selectByVisibleText(data.countyCA);
        await $(sel.btnContinue).click();
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(`How many adults are in your immediate family?`);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`How many adults are in your immediate family?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.numPeople);
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(`How many kids under 19 are in your immediate family?`);
        await expect(await $(sel.txtH3)).toHaveText(`How many kids under 19 are in your immediate family?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.numKids);
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(`Is anyone in your household pregnant?`);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`Is anyone in your household pregnant?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.pregnant);
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(`How much money did your immediate family make last month?`);
        await expect(await $(sel.txtH3)).toHaveText(`How much money did your immediate family make last month?`);
        await browser.pause(2000);
        await $$(sel.rdoButtons)[data.incomeMonthly].click();
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(`Does anyone other than your immediate family live in your household?`);
        await expect(await $(sel.txtH3)).toHaveText(`Does anyone other than your immediate family live in your household?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.otherPeople);
        this.busyCheck();
        if (data.otherPeople === 'Yes') {
            if (i > 0 && !org) await this.editAnswers(`Do you prepare meals and share food costs with any of them?`);
            await expect(await $(sel.txtH3)).toHaveText(`Do you prepare meals and share food costs with any of them?`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), data.mealsWithOthers);
            this.busyCheck();
            if (data.mealsWithOthers === 'Yes') {
                if (i > 0 && !org) await this.editAnswers(`If so, how many?`);
                await expect(await $(sel.txtH3)).toHaveText(`If so, how many?`);
                await $(sel.ddSelect).selectByVisibleText(data.mealsWithOthersNum);
                await $(sel.btnContinue).click();
                this.busyCheck();
                if (i > 0 && !org) await this.editAnswers(`What is the monthly gross income of these additional people?`);
                await expect(await $(sel.txtH3)).toHaveText(`What is the monthly gross income of these additional people?`);
                await $(sel.numberBox).setValue(data.othersIncomeMonthly);
                await $(sel.btnContinue).click();
                this.busyCheck();
            }
        }
        if (i > 0 && !org) await this.editAnswers(`Are you or anyone in your household a U.S. Citizen or U.S. National?`);
        await expect(await $(sel.txtH3)).toHaveText(`Are you or anyone in your household a U.S. Citizen or U.S. National?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.UScitizen);
        this.busyCheck();
        await this.endAssessment();
    }

    async housingInsecurity(data, i, org) {
        await $(sel.housingInsecurity).click();
        this.busyCheck();
        if (i > 0 && org) {
            await browser.pause(3000);
            await $(sel.restartAssessment).waitForDisplayed();
            await $(sel.restartAssessment).click();
        } else if (i > 0 && !org) {
            await browser.pause(3000);
            await $(sel.btnEditAnswers).waitForDisplayed();
            await $(sel.btnEditAnswers).click();
        }
        this.busyCheck();
        if (org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`The following question asks about your housing. Please indicate whether or not the following describes your situation.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), `This is for myself`);
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
        } else if (i === 0) {
            await $(sel.btnGetStarted).click();
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
        }
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(0);
        await expect(await $(sel.txtH3)).toHaveText(`How often in the past 12 months would you say you were worried or stressed about having enough money to pay your rent/mortgage?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.worried12mos);
        this.busyCheck();
        await this.endAssessment();
    }


    async foodInsecurity(data, i, org) {
        await $(sel.foodInsecurity).click();
        this.busyCheck();
        if (i > 0 && org) {
            await browser.pause(3000);
            await $(sel.restartAssessment).waitForDisplayed();
            await $(sel.restartAssessment).click();
        } else if (i > 0 && !org) {
            await browser.pause(3000);
            await $(sel.btnEditAnswers).waitForDisplayed();
            await $(sel.btnEditAnswers).click();
        }
        this.busyCheck();
        if (org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`The following questions can help you gauge your household needs and access to nutritious foods.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), `This is for myself`);
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
        } else if (i === 0) {
            await $(sel.btnGetStarted).click();
            if (i > 0) await $(sel.btnYes).click();
        }
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(0);
        await expect(await $(sel.txtH3)).toHaveText(`Within the past 12 months, the food we bought just didn’t last, and we didn’t have money to get more.`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.enoughFoodMoney);
        if (i > 0 && !org) await this.editAnswers(1);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`Within the past 12 months, we cut the size of our meals or skipped meals because there wasn’t enough money for food.`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.skippedMeals);
        this.busyCheck();
        await this.endAssessment();
    }


    async depressionRisk(data, i, org) {
        await $(sel.depression).click();
        this.busyCheck();
        if (i > 0 && org) {
            await browser.pause(3000);
            await $(sel.restartAssessment).waitForDisplayed();
            await $(sel.restartAssessment).click();
            this.busyCheck();
        } else if (i > 0 && !org) {
            await browser.pause(3000);
            await $(sel.btnEditAnswers).waitForDisplayed();
            await $(sel.btnEditAnswers).click();
            this.busyCheck();
        }
        if (org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`Answer two questions and find out if you're at risk for depression.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), `This is for myself`);
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
            this.busyCheck();
        } else if (i === 0) {
            await $(sel.btnGetStarted).click();
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
            this.busyCheck();
        }
        if (i > 0 && !org) await this.editAnswers(0);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`Over the past two weeks, how often have you been bothered by little interest or pleasure in doing things?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.lowInterest);
        this.busyCheck();
        if (i > 0 && !org) await this.editAnswers(1);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`Over the past two weeks, how often have you been bothered by feeling down, depressed, or hopeless?`);
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.hopelessness);
        this.busyCheck();
        await this.endAssessment();
    }


    async hivRisk(data, i, org) {
        await $(sel.hivRisk).click();
        this.busyCheck();
        if (i > 0) {
            await browser.pause(3000);
            await this.selectMultipleByInnerTextFromDOM(sel.restartAssessment, ['Restart Assessment'])
        }
        if (org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`Is PrEP right for me? PrEP might be right for you if you are HIV negative and are at high risk of being exposed to HIV.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), 'This is for myself');
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
        } else {
            await $(sel.btnGetStarted).click();
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
        }
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`Have you ever been diagnosed with HIV or AIDS?`); // Question #1
        await this.selectOneFromArray(await $$(sel.rdoButtons), data.hivAids);
        if (data.hivAids !== 'Yes') {
            this.busyCheck();
            await expect(await $(sel.txtH3)).toHaveText(`Are you sexually active?`); // Question #2
            await this.selectOneFromArray(await $$(sel.rdoButtons), data.sexuallyActive);
            if (data.sexuallyActive === 'Yes') {
                this.busyCheck();
                await expect(await $(sel.txtH3)).toHaveText(`How many total sexual partners have you had within the past 3 months?`); // Question #2a
                await $(sel.numberBox).setValue(data.sexPartnersTotal);
                await $(sel.btnContinue).click();
                this.busyCheck();
                await expect(await $(sel.txtH3)).toHaveText(`How many new sexual partners have you had within the past 3 months?`); // Question #2b
                await $(sel.numberBox).setValue(data.sexPartnersNew);
                await $(sel.btnContinue).click();
                this.busyCheck();
                await expect(await $(sel.txtH3)).toHaveText(`How many sexual partners have you met through dating app(s) within the past 3 months?`); // Question #2c
                await $(sel.numberBox).setValue(data.sexPartnersDatingApp);
                await $(sel.btnContinue).click();
                this.busyCheck();
                await expect(await $(sel.txtH3)).toHaveText(`Have you had sex with an HIV positive partner(s) within the past 3 months?`); // Question #3
                await this.selectOneFromArray(await $$(sel.rdoButtons), data.hivPosPartners);
                if (data.hivPosPartners === 'Yes') {
                    this.busyCheck();
                    await expect(await $(sel.txtH3)).toHaveText(`How many HIV positive partners have you had within the past 3 months ?`); // Question #3a
                    await $(sel.numberBox).setValue(data.hivPosPartnersNum);
                    await $(sel.btnContinue).click();
                }
                this.busyCheck();
                await expect(await $(sel.txtH3)).toHaveText(`Do you always wear condoms when having sex?`); // Question #4
                await this.selectOneFromArray(await $$(sel.rdoButtons), data.condomsAlways);
                if (data.condomsAlways === 'No') {
                    this.busyCheck();
                    await expect(await $(sel.txtH3)).toHaveText(`The partner receiving the penis in the anus is having anal receptive sex. Have you had condomless anal receptive sex?`); // Question #4a
                    await this.selectOneFromArray(await $$(sel.rdoButtons), data.condomlessAnalRec);
                    this.busyCheck();
                    await expect(await $(sel.txtH3)).toHaveText(`Have you had sex while being "high" or under the influence of drugs or alcohol?`); // Question #4b
                    await this.selectOneFromArray(await $$(sel.rdoButtons), data.sexOnDrugs);
                }
            }
            if (data.sexuallyActive !== 'No') {
                this.busyCheck();
                await expect(await $(sel.txtH3)).toHaveText(`Have you ever had (check all that apply)`); // Question #5
                await this.selectMultipleByInnerTextFromDOM(sel.rdoDivTxt, data.hadStds);
                await $(sel.btnContinue).click();
                this.busyCheck();
                await expect(await $(sel.txtH3)).toHaveText(`Have you ever exchanged sex for money, drugs, or other goods?`); // Question #6
                await this.selectOneFromArray(await $$(sel.rdoButtons), data.sexWorker);
                this.busyCheck();
                await expect(await $(sel.txtH3)).toHaveText(`Are you male or female?`); // Question #7
                await this.selectOneFromArray(await $$(sel.rdoButtons), data.gender);
                if (data.gender === 'Female') {
                    this.busyCheck();
                    await expect(await $(sel.txtH3)).toHaveText(`If your partner is male, does he also have sex with men?`); // Question #7a
                    await this.selectOneFromArray(await $$(sel.rdoButtons), data.partnerSexWithMen);
                }
            }
            this.busyCheck();
            await expect(await $(sel.txtH3)).toHaveText(`Have you used Methamphitamines (ex: speed, crystal) in the past year?`); // Question #8
            await this.selectOneFromArray(await $$(sel.rdoButtons), data.methUse);
            this.busyCheck();
            await expect(await $(sel.txtH3)).toHaveText(`Do you use injection drugs?`); // Question #9
            await this.selectOneFromArray(await $$(sel.rdoButtons), data.ivDrugs);
            this.busyCheck();
            await expect(await $(sel.txtH3)).toHaveText(`Where are you located? This information lets us know which services are closest to you. Zip code (Required)`); // Question #10
            await $(sel.inputBox).setValue(data.zipCode);
            await $(sel.btnContinue).click();
            this.busyCheck();
        }
        await this.endAssessment();
    }


    async diabetesRisk(data, i, org) { // TODO: Need to handle multiple assessments
        await $(sel.diabetes).click();
        this.busyCheck();
        if (org) {
            await expect(await $(sel.txtTitle1)).toHaveTextContaining(`Learn if you're at risk for Type 2 diabetes by answering a few questions.`);
            await this.selectOneFromArray(await $$(sel.rdoButtons), `This is for myself`);
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
            this.busyCheck();
        } else {
            await $(sel.btnGetStarted).click();
            this.busyCheck();
            if (i > 0) await $(sel.btnYes).click();
            this.busyCheck();
        }
        await expect(await $(sel.txtH3)).toHaveText(`What is your date of birth?`);
        const dob = await $$(sel.ddDOBSelectors);
        await dob[0].selectByVisibleText(data.dobDay);
        await dob[1].selectByVisibleText(data.dobMonth);
        await dob[2].selectByVisibleText(data.dobYear);
        await $(sel.btnContinue).click();
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`What is your gender, as specified on your identification?`);
        await this.selectOneFromArray(await $$(sel.rdoGenders), data.gender);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`Do you have a mother, father, sister, or brother with diabetes?`);
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.familyDiabetes);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`Have you ever been diagnosed with high blood pressure?`);
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.highBP);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`Are you physically active?`);
        await this.selectOneFromArray(await $$(sel.rdoYesNo), data.active);
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`How much do you weigh?`);
        await $(sel.numberBox).setValue(data.weight);
        await $(sel.btnContinue).click();
        this.busyCheck();
        await expect(await $(sel.txtH3)).toHaveText(`How tall are you?`);
        await $$(sel.numberBox)[0].setValue(data.heightFt);
        await $$(sel.numberBox)[1].setValue(data.heightIn);
        await $(sel.btnContinue).click();
        await this.endAssessment();
    }

    async checkPage() {
        await expect(await $(sel.activeTab)).toHaveText(`Assessments`);
    }

    async backToAssessments() {
        const small = await this.smallPage();
        if (small) {
            await $(this.baseSel.smallMenuBtn).click();
            await browser.pause(500);
            await $(this.baseSel.smallAssessments).click();
            await this.checkPage();
        } else {
            await $(sel.mainMenu).click();
            await browser.pause(500);
            await $(sel.menuAssessments).click();
            await this.checkPage();
        }
    }

    async editAnswers(selection) {
        await expect(await $(sel.endTitle)).toHaveText(`Here's what you said:`);
        if (typeof selection === 'string') {
            let currentList = await this.returnTextArrayLoop(sel.editAnswersArr);
            if (currentList.includes(slection)) {
                await this.selectOneFromArray(await $$(sel.editAnswersArr), selection)
            } else return false
        } else {
            await $$(sel.editAnswersArr)[selection].click();
        }
    }

    async endAssessment() {
        await expect(await $(sel.endTitle)).toHaveText(`Here's what you said:`);
        await browser.pause(1000);
        await $(sel.btnResults).click();
        this.busyCheck();
        await browser.pause(5000);
        await this.backToAssessments();
    }

    async setDefaultLocation(data) {
        await this.setLocation(data);
        await $(sel.assessments).click();
        await browser.refresh();
        await this.checkPage();
    }


}


export default new Assessments
