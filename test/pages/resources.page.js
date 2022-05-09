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
            await browser.pause(1000);
            await $(sel.browseAllCategoriesSmall).click();
        } else {
            await $(sel.btnBrowseResources).click();
            await browser.pause(1000);
            await $(sel.browseAllCategories).click();
        }
        await browser.pause(1000);
    }

    async checkResourcesMain() {
        expect(await $(sel.h1)).toHaveText("How can we help?");
        expect(await this.returnTextArrayLoop(sel.mainResources)).toEqual(data["How can we help?"]);
    }

    async checkFlow(category, collectionNum) {
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
                await this.addToCollection(category, collectionNum)
                await this.browseAllCategories();
            }
        }

    }

    async addToCollection(collection, num) {
        let addLinks, opps;
        let adds = 0;
        // Get Number of opps from page 'See all' for category
        await browser.pause(2000);
        if (await $(sel.resourcesNum).isDisplayed()) {
            opps = await $(sel.resourcesNum).getText();
            opps = +opps.slice(opps.indexOf('of') + 3, opps.indexOf('resources') - 1);
            // console.log(opps, typeof opps); // For debugging 
        } else opps = 0;
        if (opps > num) {
            for (let add = 0; add < num; add++) {
                let small = await this.smallPage();
                if (small) {
                    addLinks = await $$(sel.oppLinks);
                } else addLinks = await $$(sel.addToCollections);
                await addLinks[adds].click();
                await this.busyCheck();
                await this.spinner(15000, 'Opportunity took longer than 15s to display');
                adds++;
                if (small) await $(sel.oppCollectionAdd).click();
                await $(sel.collectionSearch).setValue(collection);
                await browser.pause(500);
                await $(sel.collectionAdd).click();
                await this.busyCheck();
                await $(sel.btnDone).click();
                await this.successClose();
                if (small) await $(sel.backBtnSmall).click();
                await this.busyCheck();
                if (adds >= 5 && add < num - 1) {
                    await $(sel.next).click();
                    await this.spinner(30000, 'Loading resource took longer than 30s');
                    adds = 0;
                }
                await this.busyCheck();
                if (add === num - 1) await browser.pause(2000)
            }
        } else return console.log('Had to bounce... Not Enough Resources Found!')
    }
}

export default new Resources