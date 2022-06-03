import Base from './base.page';
import sel from '../selectors/referrals.sel';
import help from '../helpers/helpers';

const clients = {
    a: {
        firstName: help.randomFirstNameFemale(),
        lastName: help.randomLastName(),
        email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
        phone: help.randomPhoneNumber(),
        category: 'Food',
    },
    // b: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Family & Household',
    // },
    // c: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Food',
    // },
    // d: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Health',
    // },
    // e: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Housing',
    // },
    // f: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Education',
    // },
    // g: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Legal',
    // },
    // h: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Employment',
    // },
    // i: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Money',
    // },
    // j: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Money',
    // },
    // k: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Housing',
    // },
    // l: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Health',
    // },
    // m: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Employment',
    // },
    // n: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Legal',
    // },
    // o: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Education',
    // },
    // p: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Food',
    // },
    // q: {
    //     firstName: help.randomFirstNameMale(),
    //     lastName: help.randomLastName(),
    //     email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    //     phone: help.randomPhoneNumber(),
    //     category: 'Money',
    // },
}

class Referrals extends Base {

    constructor() {
        super();
        this.clients = clients;
    }

    async addClient(obj) {
        // console.log(`${obj.firstName} ${obj.lastName}`)
        await this.menuPress('Clients');
        await this.busyCheck();
        await $(sel.addClient).click();
        await browser.pause(500);
        await $$(sel.fName)[2].setValue(obj.firstName);
        await $$(sel.lName)[2].setValue(obj.lastName);
        await $$(sel.email)[2].setValue(obj.email);
        await $(sel.phone).setValue(obj.phone);
        await $(sel.btnSave).click();
        await this.busyCheck();
        await browser.pause(500);
        if (await $(sel.matchFoundNew).isDisplayed()) {
            await $(sel.matchFoundNew).click();
            await this.busyCheck();
            await browser.pause(500);
        }
    }

    async deleteClient(obj) {
        await this.menuPress('Clients');
        await this.busyCheck();
        await this.findClient(obj);
        // await browser.debug()
        await $(sel.contactInfo).click();
        await this.busyCheck();
        await $(sel.deleteClient).click();
        await browser.pause(500);
        await $(sel.confirmYes).click();
        await this.successClose();
    }

    async referClient(obj) {
        if (!obj.category) obj.category = 'Money';
        await this.menuPress('Clients');
        await this.busyCheck();
        await this.findClient(obj);
        await $(sel.createReferral).click();
        await this.busyCheck();
        await $(`//a[text()='${obj.category}']`).click();
        await this.busyCheck();
        await $(sel.seeAll).click();
        await this.spinner(15000, 'Resource loading took over 15s');
        await $(sel.refer).click();
        await this.busyCheck();
        await $(sel.btnDoneSubmitReferral).click();
        await this.busyCheck();
        await $(sel.textArea).setValue('Say something here...');
        await this.busyCheck();
        await $(sel.btnSubmit).click();
        await this.busyCheck();
        await $(sel.btnYes).click();
        await this.busyCheck();
        await $(sel.btnYes).click();
        await this.busyCheck();
        await $(sel.btnDone).click();
        await this.busyCheck();
    }

    async checkPage() {
        await expect(await $(sel.activeTab)).toHaveText(`Assessments`);
    }

    async findClient(obj) {
        let fullName = `${obj.firstName} ${obj.lastName}`;
        await $(sel.searchInput).setValue(fullName);
        await $(sel.searchBtn).click();
        await browser.pause(500);
        await $(sel.person).click();
        await this.busyCheck();

    }

    async setDefaultLocation(data) {
        await this.setLocation(data);
        await browser.refresh();
        await $(sel.assessments).click();
        await this.checkPage();
    }

}


export default new Referrals
