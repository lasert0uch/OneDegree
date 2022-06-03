import referrals from '../pages/referrals.page';

const user = {
    email: `1degreetest+odadmin@gmail.com`,
    password: `weird*1`,
    loc: `Los Angeles`,
}

describe(`Referrals-${referrals.environment()}`, () => {
    if (referrals.large() && !['greta', 'parks', 'floyd'].includes(referrals.url.toLowerCase())) { // Conditional Run Large Only & Not these Servers

        it('Open-Page', async () => {
            await referrals.open('plan#assessments');
            await referrals.checkPage();
        })

        it('Set-Location', async () => {
            await referrals.setDefaultLocation(user)
        })

        it('Login', async () => {
            await referrals.login(user);
            await browser.pause(1000);
        })

        Object.keys(referrals.clients).forEach(key => {
            it(`Add-Client-${referrals.clients[key].firstName}-${referrals.clients[key].lastName}`, async () => {
                await referrals.addClient(referrals.clients[key]);
            })
        })

        Object.keys(referrals.clients).forEach(key => {
            it(`Refer-Client-${referrals.clients[key].firstName}-${referrals.clients[key].lastName}-For-${referrals.clients[key].category}`, async () => {
                await referrals.referClient(referrals.clients[key]);
            })
        })

        Object.keys(referrals.clients).forEach((key) => {
            it(`-Delete-Client-${referrals.clients[key].firstName}-${referrals.clients[key].lastName}`, async () => {
                await referrals.deleteClient(referrals.clients[key]);
            })
        })

        it('Return-To-Clients', async () => {
            await referrals.menuPress('Clients');
        })

    }
})