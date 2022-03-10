


class Base {
    open(path) {
        return browser.url(`https://floyd.1degree.org/${path}`)
    }

    async processMapAsync(data, method) { // This is an example of handling map and forEach in JavaScript async
        let responseArr = [];
        await Promise.all(data.map(async (elem) => {
            try {
                let insertAction = await elem.getText(); // Value or action that will get inserted into array
                responseArr.push(insertAction)  //  insertAction value is added into final response array 
            } catch (error) {
                console.log('processMapAsync error:' + error);
            }
        }))
        return responseArr
    }

    async objectsToTextandIds(objArr) { // This method returns text and ID of an Array of Objects (objArr) as an object
        let tempArr = [];
        for (const elem of objArr) {
            let tempArrInner = [];
            let insertAction = await elem.getText(); // Value of Text that will get inserted into tempArrInner
            tempArrInner.push(insertAction)  //  insertAction value is added into tempArrInner 
            let insertAction1 = await elem.getProperty('id'); // Value of ID that will get inserted into tempArrInner
            tempArrInner.push('#' + insertAction1)  //  insertAction1 value is added into tempArrInner 
            tempArr.push(tempArrInner)  //  Pushes tempArrInner Pairs to tempArr 
        }
        // console.log(tempArr);
        let resultObj = Object.fromEntries(tempArr);
        console.log(resultObj);
        return resultObj
    }

    async clickItemsFromObject(obj, arr, up) { // runs through array of object's keys for ID's to click. Optional UpArrow kep presses
        let ups = [];
        if (up > 0) {
            for (let i = 1; i <= up; i++) {
                ups.push('\ue013');
            }
        }
        for (const el of arr) {
            console.log(`'${el}': '${obj[el]}'`); // Log key:value pair of selection
            if (up > 0) await browser.keys(ups);
            await $(obj[el]).click(); // Click item
        }
    }





}

export default Base;