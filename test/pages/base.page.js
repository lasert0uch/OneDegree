import sel from "../selectors/default.sel";
import help from "../helpers/helpers"

const genericUser = {
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
}
class Base {

    open(server, path, auth) {
        server === undefined || !server ? server = 'www' : server;
        path === undefined || !path ? path = '' : path;
        auth === undefined || !auth ? auth = '' : auth; // username:password@
        console.log(`URL Launched: https://${auth}${server}.1degree.org/${path}`);
        return browser.url(`https://${auth}${server}.1degree.org/${path}`);
    }


    async processMapAsync(data, method) { // This is an example of handling map and forEach in JavaScript async
        let responseArr = [];
        await Promise.all(data.map(async (elem) => {
            try {
                let insertAction = await elem.getText(); // Value or action that will get inserted into array
                responseArr.push(insertAction)  //  insertAction value is added into final response array 
            } catch (error) {
                console.log('processMapAsync error:' + error);
            }
        }))
        return responseArr
    }

    async selectOneFromArray(objArr, textChoice) { // This is an example of handling map and forEach in JavaScript async
        for (const elem of objArr) {
            let text = await elem.getText();
            text.trim();
            console.log(text);
            if (text.includes(textChoice)) return await elem.click();
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

    async clickItemsFromObject(obj, arr, up) { // runs through array of object's keys for ID's to click. Optional UpArrow kep presses
        let ups = [];
        if (up > 0) {
            for (let i = 1; i <= up; i++) {
                ups.push('\ue013');
            }
        }
        for (const el of arr) {
            console.log(`'${el}': '${obj[el]}'`); // Log key:value pair of selection
            if (up > 0) await browser.keys(ups);
            await $(obj[el]).click(); // Click item
        }
    }

    async createAccount(data) {
        if (!data) data = genericUser;
        await $(sel.signUp).click();
        await browser.pause(1000);
        await browser.switchToFrame(null);
        await $(sel.txtEmailPhone).setValue(data.email);
        await $(sel.txtPassword).setValue(data.password);
        console.log({ email: data.email, passsword: data.password });
        await $(sel.chkBox).click();
        await $(sel.btnCreateAccount).click();
        await browser.pause(3000);
        await $$(sel.txtLocationSetters)[1].setValue(data.loc);
        await browser.pause(2000);
        await browser.keys(['\uE007']);
        if (data.lang === 'Spanish') await $(sel.langSpanish).click();
        await $(sel.btnContinue).click();
        await $(sel.txtFirstName).setValue(data.firstName);
        await $(sel.txtLastName).setValue(data.lastName);
        await $(sel.txtOrg).setValue(data.org);
        await browser.pause(5000);
        await browser.keys(['\ue013']);
        await browser.keys(['\uE007']);
        await $(sel.txtPosition).setValue(data.position);
        await $(sel.btnConnect).click();
        await browser.pause(2000);
        // await $(sel.txtPhone).setValue(data.phone);
        // await $(sel.ddDOBDay).selectByVisibleText(data.dobDay);
        // await $(sel.ddDOBMonth).selectByVisibleText(data.dobMonth);
        // await $(sel.ddDOBYear).selectByVisibleText(data.dobYear);
        await $(`//label[contains(text(),'${data.gender}')]`).click();
        await $(sel.btnContinue).click();
        await browser.switchToParentFrame();
        // await browser.pause(10000);
    }



}

export default Base;