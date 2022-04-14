import Base from './base.page';
import sel from '../selectors/resources.sel';
import scenarios from '../data/resources.data';

class Resources extends Base {

    async checkPage() {
        await $(this.baseSel.signUp).waitForDisplayed();
    }

    async goUrgent() {
        await this.selectMultipleByInnerTextFromDOM(sel.resourcesBar, ['Urgent']);
        expect(await $(`//h1`)).toHaveText('Pick a category');
    }

    async browseAllCategories() {
        await $(sel.btnBrowseResources).click();
        await this.browseAllCategories.pause(500);
        await $(sel.browseAllCategories).click();
    }





}

export default new Resources