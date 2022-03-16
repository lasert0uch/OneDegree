import femaleNames from './txt/female-names';
import maleNames from './txt/male-names';
import lastNames from './txt/last-names';

const areaCodes = [415, 510, 209, 916, 212];

export default {
    generateRandomStringOfIntegers(n) { // With SSN Provisions and No Start with Zero
        let foo = [];
        function randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        }
        for (let i = 1; i <= n; i++) {
            foo.push(randomInteger(0, 9));
        }
        if (foo[0] === 0) { // It's just weird to start with a zero, even though okay for SSN's
            foo.shift();
            foo.unshift(randomInteger(1, 8));
        }
        if (n === 9) { // For SSN Validation (assumed, if 9)
            while (!/^(?!(000|666|9))(\d{3}?(?!(00))\d{2}?(?!(0000))\d{4})$/.test(foo.join('').toString())) {
                foo.pop();
                foo.unshift(randomInteger(1, 5));
            }
        }
        return foo.join('').toString(); // outputs array as a string
    },

    generateRandomStringOfLetters(n) {
        let foo = "";
        function randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        }
        for (let i = 1; i <= n; i++) {
            foo += String.fromCharCode(randomInteger(65, 90)).toLowerCase();
        }
        return foo;
    },

    daysAgo(days) {
        const date = new Date();
        let upDate = new Date(date.setDate(date.getDate() - days)).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return upDate;
    },

    yearsMonthAgo(years, months) {
        let now = new Date();
        return new Date(now.getFullYear() - years, now.getMonth() - months, now.getDate())
            .toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },

    yearsMonthsDaysAgo(years, months, days) {
        let now = new Date();
        return new Date(now.getFullYear() - years, now.getMonth() - months, now.getDate() - days)
            .toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },

    daysFromNow(days) {
        const date = new Date();
        let upDate = new Date(date.setDate(date.getDate() + days)).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return upDate;
    },

    todaysDate() {
        return new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },

    lastDayOfCurrentMonth() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0)
            .toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
            .split('/').join('');
    },

    firstDayOfCurrentMonth() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1)
            .toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
            .split('/').join('');
    },


    fifteenDayOfCurrentMonth() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 15)
            .toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
            .split('/').join('');
    },

    randomFirstNameMale() {
        return maleNames[Math.floor(Math.random() * maleNames.length)];
    },

    randomFirstNameFemale() {
        return femaleNames[Math.floor(Math.random() * femaleNames.length)];
    },

    randomMiddleNameMale() {
        return maleNames[Math.floor(Math.random() * maleNames.length)];
    },

    randomMiddleNameFemale() {
        return femaleNames[Math.floor(Math.random() * femaleNames.length)];
    },

    randomLastName() {
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    },

    randomPhoneNumber() {
        return areaCodes[Math.floor(Math.random() * areaCodes.length)] + this.generateRandomStringOfIntegers(7);
    },

    dobDate(age) {
        let now = new Date();
        function randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        }
        return new Date(now.getFullYear() - age, now.getMonth() - randomInteger(2, 4), now.getDate() - randomInteger(1, 28))
            .toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
    },


}
