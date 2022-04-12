import main from '../pages/main.page';

describe('LAHIP-Homeless-Help-Test', () => {

    it('Open-Main-Page-LA', async () => {
        await main.open('lahip', 'demo:peoplefirst@', 'floyd');
    })

    it('Check-Homeless-Help-Logo', async () => {
        await main.checkLogo();
    })

    it('Click-Selected-UserType-and-Resources', async () => {
        await main.buttons1();
    })

    it('Input-Demographic-Information-and-Get-Results', async () => {
        await main.buttons2();
    })

})