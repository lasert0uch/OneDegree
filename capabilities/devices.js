const devices = [
    // {
    //     "os_version": "14",
    //     "device": "iPad Pro 12.9 2020",
    //     "real_mobile": "true",
    //     "browserName": "iPad",
    //     "deviceOrientation": "landscape",
    //     resolution: '1253x1024'
    // },
    // {
    //     "os_version": "9.0",
    //     "device": "Samsung Galaxy Tab S6",
    //     "real_mobile": "true",
    //     "deviceOrientation": "landscape",
    //     "browserName": "Android",
    //     resolution: '1138x712'
    // },
    // {
    //     "os_version": "13",
    //     "device": "iPad Mini 2019",
    //     "real_mobile": "true",
    //     "deviceOrientation": "landscape",
    //     "browserName": "iPad",
    //     resolution: '1024x768'
    // },
    {
        "os_version": "10.0",
        "device": "Samsung Galaxy Note 20 Ultra",
        "real_mobile": "true",
        "deviceOrientation": "portrait",
        "browserName": "Android",
        resolution: '412x753'
    },
    // {
    //     "os_version": "13",
    //     "device": "iPad Mini 2019",
    //     "real_mobile": "true",
    //     "browserName": "iPad",
    //     resolution: '768x1024'
    // },
    // {
    //     "os_version": "12",
    //     "device": "iPhone 8 Plus",
    //     "real_mobile": "true",
    //     "deviceOrientation": "landscape",
    //     "browserName": "iPhone",
    //     resolution: '736x414'
    // },
    // {
    //     "os_version": "14",
    //     "device": "iPhone 12 Pro Max",
    //     "real_mobile": "true",
    //     "browserName": "iPhone",
    //     resolution: '393x786'
    // }
];

devices.forEach(el => el.name = `${el.device}-${el.resolution}`);

export default devices;