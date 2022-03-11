import main from '../pages/main.page';

describe('Main-Page-Tests', () => {

    it('Open-Main-Page-LA', async () => {
        await main.open('floyd', 'lahip');
    })

    it('Check-Homeless-Help-Logo', async () => {
        await main.checkLogo();
    })

    it('Click-All-Page-One-Buttons', async () => {
        await main.buttons1();
    })

    it('Click-Page-Two-Buttons', async () => {
        await main.buttons2();
    })

})