
import resources from '../pages/resources.page';

describe(`Resources-${resources.environment()}`, () => {

    it('Open-Resources-Page', async () => {
        await resources.open();
    })

    it('Check-Page', async () => {
        await resources.checkPage()
    })

    it('Click-Urgent', async () => {
        await resources.goUrgent();
    })

    it('Set-Location', async () => {
        await resources.setLocation(resources.genericUser);
    })

    it('Browse-All-Resources', async () => {
        await resources.browseAllCategories();
    })

    it('Check-Urgent-Resources', async () => {
        await resources.checkFlow('Urgent');
    })

    it('Check-Family-and-Household-Resources', async () => {
        await resources.checkFlow('Family & Household');
    })

    it('Check-Food-Resources', async () => {
        await resources.checkFlow('Food');
    })

    it('Check-Health-Resources', async () => {
        await resources.checkFlow('Health');
    })

    it('Check-Housing-Resources', async () => {
        await resources.checkFlow('Housing');
    })

    it('Check-Education-Resources', async () => {
        await resources.checkFlow('Education');
    })

    it('Check-Legal-Resources', async () => {
        await resources.checkFlow('Legal');
    })

    it('Check-Employment-Resources', async () => {
        await resources.checkFlow('Employment');
    })

    it('Check-Money-Resources', async () => {
        await resources.checkFlow('Money');
    })

})