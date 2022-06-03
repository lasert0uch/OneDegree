import resources from '../pages/resources.page';
import collections from '../pages/collections.page';
import help from '../helpers/helpers'
let org = false;
const user = {
    firstName: help.randomFirstNameMale(),
    lastName: help.randomLastName(),
    email: `1degreetest+${help.generateRandomStringOfIntegers(10)}@gmail.com`,
    phone: help.randomPhoneNumber(),
    password: 'Password1*',
    loc: 'Los Angeles', // 'San Francisco', 'Los Angeles'
    org: null, // null, 'SBCC Thrive LA', 'One Degree' 'Sutter Health'
    position: 'Social Worker',
    lang: 'English',
    dobDay: '10',
    dobMonth: 'January',
    dobYear: '2001',
    gender: 'Male',
}

describe(`Collections-${collections.environment()}`, () => {

    it('Open-Resources-Page', async () => {
        await collections.open();
    })

    it('Check-Page', async () => {
        await resources.checkPage()
    })

    it('Click-Urgent', async () => {
        await resources.goUrgent();
    })

    it('Set-Location', async () => {
        await collections.setLocation(user);
    })

    it('Browse-All-Resources', async () => {
        await resources.browseAllCategories();
    })

    it('Create-Account', async () => {
        org = await collections.createAccount(user);
    })

    it('Go-To-Collections', async () => {
        await collections.menuPress('Collections');
        await collections.menuPress('Collections'); // ! Why need to press twice to get to Collections?
        await collections.spinner(60000, 'Took longer than 60 seconds to get to "My Collections"')
    })

    it('Create-Collections', async () => {
        await collections.createCollections(resources.data, user); // resources.data, user
    })

    it('Browse-All-Resources', async () => {
        await resources.browseAllCategories();
    })

    it('Add-To-Urgent-Collection', async () => {
        await resources.checkFlow('Urgent', 11);
    })

    it('Add-To-Family-Collection', async () => {
        await resources.checkFlow('Family & Household', 11);
    })

    it('Add-To-Money-Collection', async () => {
        await resources.checkFlow('Money', 1);
    })

    if (!['greta'].includes(collections.url.toLowerCase())) { // Can add exclusions for any env here

        it('Add-To-Employment-Collection', async () => {
            await resources.checkFlow('Employment', 1);
        })

        it('Add-To-Education-Collection', async () => {
            await resources.checkFlow('Education', 1);
        })

        it('Add-To-Housing-Collection', async () => {
            await resources.checkFlow('Housing', 1);
        })

        it('Add-To-Health-Collection', async () => {
            await resources.checkFlow('Health', 1);
        })

        it('Add-To-Food-Collection', async () => {
            await resources.checkFlow('Food', 1);
        })

    }

})