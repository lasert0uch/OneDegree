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
        if (await this.smallPage()) {
            expect(await $(sel.categoryName)).toHaveText('Urgent');
        } else expect(await $(sel.h1)).toHaveText('Pick a category');
    }

    async browseAllCategories() {
        if (await $(sel.pancakes).isDisplayed()) {
            await $(sel.pancakes).click();
            await browser.pause(500);
            await $(sel.browseAllCategoriesSmall).click();
        } else {
            await $(sel.btnBrowseResources).click();
            await browser.pause(500);
            await $(sel.browseAllCategories).click();
        }
        await browser.pause(500);
    }

    async checkResourcesMain() {
        expect(await $(sel.h1)).toHaveText("How can we help?");
        expect(await this.returnTextArrayLoop(sel.mainResources)).toEqual(data["How can we help?"]);
    }

    async checkFlow(category) {
        console.log(category);
        let array1 = Object.keys(data[category]);
        if (await $(sel.mainResources).isDisplayed()) {
            await this.selectOneFromArray(await $$(sel.mainResources), category);
        } else await this.selectOneFromArray(await $$(sel.mainResourcesAlt), category);
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
                if (await $(sel.backBtnSmall).isDisplayed()) {
                    await $(sel.backBtnSmall).click();
                } else await $(sel.backBtn).click();
                await browser.pause(500);
            } else {
                await browser.pause(3000);
                if (await $(sel.closeBtn).isDisplayed()) await $(sel.closeBtn).click();
                await browser.pause(2000);
                await this.browseAllCategories()
            }
        }
    }

}

export default new Resources