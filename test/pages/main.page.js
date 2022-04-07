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
        await this.selectMultipleByInnerTextFromDOM(sel.buttons1, ['Individual'])
        await browser.pause(1000);
        let programs = ['Laundry', 'Hygiene', 'Showers', 'Mail', 'Storage', 'Employment', 'Medical care', 'Child care', 'Foreclosure', 'Moving assistance', 'Short-term shelters'];
        await this.selectMultipleByInnerTextFromDOM(sel.buttons2, programs)
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
        await browser.waitUntil(async () => (await $(sel.labelResults).isDisplayed()),
            {
                timeout: 60000,
                timeoutMsg: ' Homeless Help Results took longer than 60s to display!'
            }
        );
        await browser.pause(2000);
        await $$('label[for*="section"]')[0].scrollIntoView();
        await browser.pause(2000);
        await $$('label[for*="section"]')[1].click();
        await $$('label[for*="section"]')[1].scrollIntoView();
        await browser.pause(2000);
        await $$('label[for*="section"]')[2].click();
        await $$('label[for*="section"]')[2].scrollIntoView();
        await browser.pause(2000);
    }

}


export default new Main
