import sel from "../selectors/default.sel";
import help from "../helpers/helpers"

const genericUser = {
    firstName: help.randomFirstNameFemale(),
    lastName: help.randomLastName(),
    email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    phone: help.randomPhoneNumber(),
    password: 'Password1*',
    loc: 'Los Angeles', // 'San Francisco', 'Los Angeles'
    org: null, // null, 'SBCC Thrive LA', 'One Degree'
    position: 'Social Worker',
    lang: 'English',
    dobDay: '10',
    dobMonth: 'January',
    dobYear: '2001',
    gender: 'Female',
}
class Base {
    constructor() {
        this.url = this.environment();
        this.baseSel = sel;
        this.genericUser = genericUser;
    }

    // ------------------ Open Page ------------------ //

    async open(path, serverForce) {
        let auth;
        let server = this.url.toLowerCase();
        if (serverForce) server = serverForce.toLowerCase();
        path === undefined || !path ? path = '' : path;
        // auth === undefined || !auth ? auth = '' : auth; // username:password@
        if (server === 'greta') {
            auth = 'clr:clrtest@';
        } else if (server === 'floyd') {
            auth = 'lacounty:findresources@';
        } else auth = 'demo:peoplefirst@';
        if (server === 'local') {
            console.log(`URL Launched: http://${auth}localhost:3000/${path}`);
            await browser.url(`http://${auth}localhost:3000/${path}`);
            return await browser.url(`http://localhost:3000/${path}`);
        } else {
            console.log(`URL Launched: https://${auth}${server}.1degree.org/${path}`);
            await browser.url(`https://${auth}${server}.1degree.org/${path}`);
            return await browser.url(`https://${server}.1degree.org/${path}`);
        }
    }

    environment() {
        if (process.env.BS) { // Derives environment (in constructor), from each browser's capabilites for BrowserStack or local runs
            return browser.capabilities.prefs.environment;
        } else {
            return browser.capabilities['goog:chromeOptions'].prefs.environment;
        }
    }

    large() {
        if (process.env.BS) {
            let str = browser.capabilities.resolution;
            return +str.substring(0, str.indexOf("x")) > 991;
        } else {
            let str = browser.capabilities['goog:chromeOptions'].args[0]
            return +str.substring(str.indexOf('=') + 1, str.indexOf(",")) > 991;
        }
    }

    // ------------------ Sizing ------------------ //

    async smallPage() {
        const pageWidth = await $('html').getSize('width');
        if (pageWidth < 992) {
            return true;
        } else return false;
    }

    // ------------------ Core Selection Methods ------------------ //

    async returnTextArrayMap(sel) { // How to handle Array.map in async, but can come out of order
        sel = await $$(sel);
        let responseArr = [];
        await Promise.all(sel.map(async (elem) => {
            try {
                let insertAction = await elem.getText(); // Value or action that will get inserted into array
                responseArr.push(insertAction)  //  insertAction value is added into final response array 
            } catch (error) {
                console.log('returnTextArrayMap() - error:' + error);
            }
        }))
        // console.log(responseArr);
        return responseArr
    }

    async returnTextArrayLoop(sel) {
        sel = await $$(sel);
        let responseArr = [];
        for (const el of sel) {
            let elText = await el.getText();
            responseArr.push(elText);
        }
        return responseArr;
    }

    async selectOneFromArray(objArr, textChoice) {
        for (const elem of objArr) {
            let text = await elem.getText();
            // text = text.toLowerCase(); // If needed, need to add to if statement below
            if (text.includes(textChoice)) {
                // console.log(text);
                return await elem.click();
            }
        }
    }

    async selectMultipleByInnerTextFromDOM(cssSelector, choices) {
        // console.log(choices, cssSelector); // * For Debugging Purposes
        await browser.execute((cssSelector, choices) => {
            document.querySelectorAll(cssSelector).forEach(el => {
                let choice = el.innerText.trim();
                if (choices.includes(choice)) {
                    // console.log(choice); // * Only Shows in DOM, NOT in Terminal
                    el.click();
                }
            });
        }, cssSelector, choices);
    }

    async selectMultipleFromArray(objArr, textChoices) {
        for (const elem of objArr) {
            let text = await elem.getText();
            text.trim();
            for (const textChoice of textChoices) {
                if (text.includes(textChoice)) {
                    // console.log(text); // * For Debugging Purposes...
                    await elem.scrollIntoView();
                    await elem.click();
                }
            }
        }
    }

    async objectsToTextandIds(objArr) { // This method returns text and ID of an Array of Objects (objArr) as an object
        let tempArr = [];
        for (const elem of objArr) {
            let tempArrInner = [];
            let insertAction = await elem.getText(); // Value of Text that will get inserted into tempArrInner
            tempArrInner.push(insertAction)  //  insertAction value is added into tempArrInner 
            let insertAction1 = await elem.getProperty('id'); // Value of ID that will get inserted into tempArrInner
            tempArrInner.push('#' + insertAction1)  //  insertAction1 value is added into tempArrInner 
            tempArr.push(tempArrInner)  //  Pushes tempArrInner Pairs to tempArr 
        }
        // console.log(tempArr);
        let resultObj = Object.fromEntries(tempArr);
        console.log(resultObj);
        return resultObj
    }

    async clickItemsFromObject(obj, arr) { // runs through array of object's keys for ID's to click. Optional UpArrow kep presses
        for (const el of arr) {
            console.log(`'${el}': '${obj[el]}'`); // Log key:value pair of selection
            await $(obj[el]).click(); // Click item
        }
    }

    async busyCheck() {
        await browser.pause(300)
        if (await $(sel.loading).isDisplayed() || await $(sel.spinner).isDisplayed()) {
            // console.log('LOADING...');
            while (await $(sel.loading).isDisplayed()) {
                await browser.pause(250);
            }
            // while (await $(sel.spinner).isDisplayed()) { // ! Not best practice to wait forever for API results
            //     await browser.pause(250);
            // }
        }
    }

    async successClose() {
        await browser.pause(500);
        if (await $(sel.successAlert).isDisplayed()) await $(sel.successAlert).click();
        await browser.pause(500)
    }

    async spinner(time, msg) {
        await browser.pause(500)
        await browser.waitUntil(async () => (!await $(this.baseSel.spinner).isDisplayed()),
            {
                timeout: time,
                timeoutMsg: msg
            }
        );
    }


    // ------------------ Platform Checks ------------------ //

    desktopOnly() {
        if (process.env.BS === 'true') {
            return browser.capabilities.platform === 'WINDOWS' || browser.capabilities.platformName === 'macOS'
        } else {
            return true
        }
    }

    chromeOnly() {
        if (process.env.BS === 'true') {
            return browser.capabilities.platform === 'WINDOWS' && browser.capabilities.browserName === 'chrome'
        } else {
            return true
        }
    }

    iOSOnly() {
        if (process.env.BS === 'true') {
            return browser.capabilities.platformName === 'iOS'
        } else {
            return false
        }
    }

    androidOnly() {
        if (process.env.BS === 'true') {
            return browser.capabilities.platformName === 'Android'
        } else {
            return false
        }
    }

    safariOnly() {
        if (process.env.BS === 'true') {
            return browser.capabilities.platformName === 'macOS' && browser.capabilities.browserName === 'Safari'
        } else {
            return false
        }
    }

    firefoxOnly() {
        if (process.env.BS === 'true') {
            return browser.capabilities.browserName === 'firefox';
        } else return false
    }

    // ------------------ Create Account / Login ------------------ //

    async createAccount(data) {
        if (!data) data = genericUser;
        const small = await this.smallPage();
        if (small) {
            await $(sel.smallMenuBtn).click();
            await browser.pause(1000);
            await $(sel.smallSignUp).click();
            await browser.pause(1000);
        } else await $(sel.signUp).click();
        await browser.pause(1000);
        await browser.switchToFrame(null);
        await $(sel.txtEmailPhone).setValue(data.email);
        await $(sel.txtPassword).setValue(data.password);
        if (data.org) {
            await $(sel.chkBox).click();
        }
        await $(sel.btnCreateAccount).click();
        await this.busyCheck();
        console.log({ email: data.email, password: data.password });
        await browser.pause(3000);
        if (small) {
            $(sel.txtLocationSetters).setValue(data.loc)
        } else await $$(sel.txtLocationSetters)[1].setValue(data.loc);
        await browser.pause(2000);
        await $(`//span[text()='${data.loc}']`).click();
        if (data.lang === 'Spanish') await $(sel.langSpanish).click();
        await $(sel.btnContinue).click();
        await this.busyCheck();
        if (data.org) {
            await $(sel.txtFirstName).setValue(data.firstName);
            await $(sel.txtLastName).setValue(data.lastName);
            await $(sel.txtOrg).setValue(data.org);
            await browser.pause(5000);
            await $(`//div[text()='${data.org}']`).click();
            await $(sel.txtPosition).setValue(data.position);
            await $(sel.btnConnect).scrollIntoView();
            await $(sel.btnConnect).click();
            await browser.pause(2000);
            await this.busyCheck();
        } else {
            await $(sel.txtFirstName).setValue(data.firstName);
            await $(sel.txtLastName).setValue(data.lastName);
        }
        await $(sel.txtPhone).setValue(data.phone);
        await $(sel.ddDOBDay).click();
        await browser.pause(100);
        await $(`//a[text()='${data.dobDay}']`).click();
        await $(sel.ddDOBMonth).click();
        await browser.pause(100);
        await $(`//a[text()='${data.dobMonth}']`).click();
        await $(sel.ddDOBYear).click();
        await browser.pause(100);
        await $(`//a[text()='${data.dobYear}']`).click();
        await $(`//label[contains(text(),'${data.gender}')]`).click();
        await $(sel.btnContinue).click();
        await this.busyCheck();
        await browser.switchToParentFrame();
        if (data.org) {
            return true
        } else return false
    }

    async login(data) {
        if (!data) data = genericUser;
        const small = await this.smallPage();
        if (small) {
            await $(sel.smallMenuBtn).click();
            await browser.pause(1000);
            await $(sel.smallLogin).click();
            await browser.pause(1000);
        } else await $(sel.logIn).click();
        await browser.pause(1000);
        await browser.switchToFrame(null);
        await $(sel.txtLoginEmailPhone).setValue(data.email);
        await $(sel.txtLoginPassword).setValue(data.password);
        await browser.pause(1000);
        await $(sel.btnLogin).click();
    }


    async setLocation(data) {
        const small = await this.smallPage();
        if (small) {
            await $(sel.smallMenuBtn).click();
            await browser.pause(3000);
            await $(sel.smallLocation).click();
        }
        await $(sel.locationSetter).setValue(data.loc);
        await browser.pause(2000);
        await $(`//span[text()='${data.loc}']`).click();
        if (small) {
            await $(sel.smallMenuBtn).click();
            await browser.pause(2000);
            if (await $(sel.smallDismissApp).isDisplayed()) await $(sel.smallDismissApp).click();
        }
        await browser.pause(500);
    }

    async menuPress(choice) { // 'Dashboard', 'My Plan', 'Assessments', 'Collections', 'Clients', '', 
        if (await this.smallPage()) {
            if (choice !== 'Dashboard') {
                await browser.pause(2000);
                await $(sel.smallMenuBtn).click();
                await browser.pause(1000);
            }
            switch (choice) {
                case 'Dashboard':
                    await $(`//a[@href='/dashboard']`).click();
                    break;
                case 'Clients':
                    await $(`//a[@href='/clients']/i`).click();
                    break;
                case 'My Plan':
                    await $(`//a[@href='/plan#resources']/i`).click();
                    break;
                case 'Assessments':
                    await $(`//a[@href='/plan#assessments']/i`).click();
                    break;
                case 'Collections':
                    await $(`//a[@href='/collections?page=my']/i`).click();
                    break;
                default:
                    console.log(`Menu option not available for: "${choice}"`);
            }
        } else {
            await $(sel.menuBtn).click();
            await browser.pause(500);
            if ($(`//span[contains(text(),'${choice}')]`).isDisplayed()) {
                await $(`//span[contains(text(),'${choice}')]`).click();
            } else console.log(`Menu option not found: "${choice}"`);
        }
        if (choice === 'Dashboard') {
            await browser.pause(2000);
            if (await $(sel.close).isDisplayed()) {
                await $(sel.close).click();
            }
        }
        await browser.pause(500);
    }



}

export default Base;