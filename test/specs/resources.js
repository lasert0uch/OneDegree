
import resources from '../pages/resources.page';
let org;




describe('Resources', () => {

    it('Open-Default-Page', async () => {
        await resources.open();
    })

    it('Check-Page', async () => {
        await resources.checkPage()
    })

    it('Go-Urgent', async () => {
        await resources.goUrgent()
    })

    it('Create-Account', async () => {
        org = await resources.createAccount();
        // await browser.debug();
    })

})