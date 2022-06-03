export default {
    locationSetter: `input[id^=location_setter]`,
    activeTab: '.ng-binding.active',
    assessments: `//a[@href='/plan#assessments']`,
    addClient: `//button[@ng-click='addNewClient()']`,
    fName: `//input[@placeholder='First name*']`, // 3rd in array
    lName: `//input[@placeholder='Last name*']`, // 3rd in array
    email: `//input[@placeholder='Email']`, // 3rd in array
    phone: `//input[@placeholder='Cell phone']`, // 3rd in array
    langEn: `//input[@type='radio' and @value='en']`,
    langEs: `//input[@type='radio' and @value='es']`,
    advancedOptions: `//span[text()='Advanced options']`,
    excludeChk: `//input[@type='checkbox' and @value='untracked']`,
    btnSave: `//button[@ng-click='submitAction()']`,
    backToClients: `//button[@ng-click='goBack()']`,
    matchFoundNew: `//button[@ng-if='matchFound']`,
    searchInput: `#clientSearchInput`,
    searchBtn: `//button[@ng-click="doSearch()"]`,
    person: `//i[@class="fa fa-fw fa-user"]`,
    contactInfo: `//a[@ng-click="changeTab('contact')"]`,
    deleteClient: `//a[@ng-click="deleteClient()"]`,
    btnDoneSubmitReferral: `//button[@ng-click='submitReferral()']`,
    seeAll: `//div[contains(text(),'See all')]`,
    refer: `.fa.fa-fw.fa-share`,
    confirmYes: `//button[text()='Yes']`,
    createReferral: `//button[@ng-click='startReferral()']`,
    textArea: `//textarea[@type='text']`,
    btnSubmit: `.btn.btn-primary.btn-big-submit.pull-right.ng-binding.ng-scope`,
    btnYes: `//button[text()='Yes']`,
    btnDone: `//button[text()='Done']`,



}