import Base from './base.page';
import sel from '../selectors/resources.sel';
import data from '../data/resources.data';

class Resources extends Base {
    constructor() {
        super();
        this.data = data;
    }

    async checkPage() {
        await $(this.baseSel.signUp).waitForDisplayed();
    }

    async goUrgent() {
        await this.selectMultipleByInnerTextFromDOM(sel.resourcesBar, ['Urgent']);
        expect(await $(`//h1`)).toHaveText('Pick a category');
    }

    async browseAllCategories() {
        await $(sel.btnBrowseResources).click();
        await browser.pause(500);
        await $(sel.browseAllCategories).click();
        await browser.pause(500);
    }

    async checkResourcesMain() {
        expect(await $(sel.h1)).toHaveText("How can we help?");
        expect(await this.returnTextArrayLoop(sel.mainResources)).toEqual(data["How can we help?"]);
    }

    async checkFlow(category) {
        console.log(category);
        let array1 = Object.keys(data[category]);
        await this.selectOneFromArray(await $$(sel.mainResources), category);
        browser.pause(500);
        expect(await this.returnTextArrayLoop(sel.mainResources)).toEqual(array1);
        browser.pause(500);
        for (const key of array1) {
            // console.log(key) // * for debugging purposes
            await this.selectOneFromArray(await $$(sel.mainResources), key);
            await browser.pause(500);
            if (data[category][key]) {
                expect(await this.returnTextArrayLoop(sel.mainResources)).toEqual(data[category][key]);
            }
            if (key !== 'See all') {
                await $(sel.backBtn).click();
                await browser.pause(500);
            } else {
                await browser.pause(1000);
                if (await $(sel.closeBtn).isDisplayed()) await $(sel.closeBtn).click();
                await browser.pause(6000);
                await this.browseAllCategories()
            }
        }
    }

}

export default new Resources