import Base from "./base.page";
import sel from "../selectors/collections.sel";

class Collections extends Base {
    constructor() {
        super();
    }

    async createCollection(title, user) {
        // console.log(title)
        // console.log(user)
        await $(sel.createNewCollection).click();
        await browser.pause(1000);
        await $$(sel.modalTitle)[2].setValue(title);
        await browser.pause(2000)
        let i = await $$(sel.modalAddress).length - 1;
        $$(sel.modalAddress)[i].setValue(user.loc);
        await browser.pause(1000);
        $$(sel.modalAddress)[i].addValue(' ');
        await browser.pause(2000);
        $(`//span[text()='${user.loc}']`).click();
        await browser.pause(500);
        $(sel.modalPrivate).click();
        await browser.pause(500);
        await $(sel.modalCreateCollectionBtn).click();
        await this.successClose();
        await this.spinner(60000, 'Collection Creation took longer than 60s')
        await this.successClose();
        await this.menuPress('Collections');
        await browser.pause(1000);
    }

    async createCollections(obj, user) {
        if (!obj) obj = { 'Family & Household': null };
        if (!user) user = { loc: 'Los Angeles' };
        // console.log(Object.keys(obj))
        for (const title of Object.keys(obj)) {
            await this.createCollection(title, user)
        }
    }



}

export default new Collections