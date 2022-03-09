import Base from './base.page';
import sel from '../selectors/main.sel'



class Main extends Base {

    constructor() {
        super();
    }

    async checkLogo() {
        const logo = await $(sel.logo);
        await expect(logo).toHaveAttr('src', 'https://firebasestorage.googleapis.com/v0/b/lac-hip.appspot.com/o/branding%2Fhh-logo-header.svg?alt=media');
        await expect(logo).toHaveAttr('alt', 'Housing Help Logo');
    }

    async buttons1() {
        const buttons1 = await $$(sel.buttons1);
        // console.log(await this.processMapAsync(buttons))
        console.log(await this.processMapAsync(buttons1)) // logs [ 'Individual', 'Service Provider', 'Admin' ]
        const text = await this.processMapAsync(buttons1);
        await buttons1[text.findIndex(el => el === 'Individual')].click();
        const buttons2 = await $$(sel.buttons2);
        const selections = await this.processMapToTextandIdObject(buttons2); // Can't use due to ID's with Spaces :(
        for (let item of buttons2) {
            await item.click();
        }
        await $(sel.next).click();
        await browser.pause(1000);
    }

    async buttons2() {
        await $(sel.yes).click(); // Homeless Yes
        await $(sel.parent).click();
        await $(sel.location).setValue('1906, 100 W 7th St, Los Angeles, CA 90014');
        await browser.pause(500);
        await $$('.pac-container')[0].click();
        await browser.pause(100);
        await $(sel.seeResources).click();
        await browser.pause(5000);
    }


    open(path) {
        return super.open(path);
    }
}


export default new Main
