


class Base {
    open(path) {
        return browser.url(`https://floyd.1degree.org/${path}`)
    }

    async processMapAsync(data, method) { // This is an example of handling map and forEach in JavaScript async
        let responseArr = []
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


}

export default Base;