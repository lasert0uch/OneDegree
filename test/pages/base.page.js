


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
                console.log('error:' + error);
            }
        }))
        console.log('complete all') // gets loged first - Can be commented or removed later
        return responseArr
    }


    async processMapToTextandIdObject(objArr) { // This method returns text and ID of an Array of Objects (objArr) as an object
        let tempArr = [];
        await Promise.all(objArr.map(async (elem) => {
            try {
                let tempArrInner = [];
                let insertAction = await elem.getText(); // Value of Text that will get inserted into tempArrInner
                tempArrInner.push(insertAction)  //  insertAction value is added into tempArrInner 
                let insertAction1 = await elem.getProperty('id'); // Value of ID that will get inserted into tempArrInner
                tempArrInner.push('#' + insertAction1)  //  insertAction1 value is added into tempArrInner 
                tempArr.push(tempArrInner)  //  Pushes tempArrInner Pairs to tempArr 
            } catch (error) {
                console.log('error:' + error);
            }
        }))
        // console.log('complete all') // gets loged first - Can be commented or removed later
        // console.log(tempArr);
        let resultObj = Object.fromEntries(tempArr);
        // console.log(resultObj);
        return resultObj
    }



}

export default Base;