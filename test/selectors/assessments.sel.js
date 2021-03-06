export default {
    locationSetter: `input[id^=location_setter]`,
    labelLinks: '.ng-scope.right-padding a',
    assessments: `a[href='/plan#assessments']`,
    activeTab: '.ng-binding.active',
    txtTitle1: '.description.ng-binding',
    heading: `//div[@class='title ng-binding']`,
    mainMenu: `.main-menu`,
    menuAssessments: `//span[contains(text(),'Assessments')]`,
    restartAssessment: `button[ng-if="elementVisible('RestartButton')"]`,
    btnGetStarted: `//button[contains(text(),'Get started')]`,
    btnContinue: `//button[contains(text(),'Continue')]`,
    btnResults: `//button[contains(text(),'See your results')]`,
    btnEditAnswers: `//button[@ng-if="elementVisible('EditAnswersButton')"]`,
    txtH1: `//h1`,
    txtH3: `//h3`,
    ddDOBSelectors: `.date-selectors .form-control`,
    rdoGenders: `.radio.ng-scope div`,
    rdoYesNo: `.connected-radio-buttons li label`,
    numberBox: `//input[@type='number']`,
    inputBox: `//input[@type='text' and contains(@class, 'form-control')]`,
    endTitle: `.edit-title.ng-binding`,
    rdoDivTxt: `.radio div`,
    rdoButtons: `.radio`, // Generic
    rdoCheckList: `.connected-radio-buttons li`,
    btnYes: `//button[text()='Yes']`,
    diabetes: `//a[contains(text(),'Diabetes Risk')]`,
    depression: `//a[@href='/assessments/depression']`,
    foodInsecurity: `//a[contains(text(),'Food Insecurity')]`,
    housingInsecurity: `//a[@href='/assessments/housing-insecurity']`,
    calFreshMediCal: `//a[@href='/assessments/calfresh-and-medi-cal-eligibility']`,
    housingHelper: `//a[contains(text(),'Housing Helper')]`,
    covid19: `//a[contains(text(),'COVID-19 Resource Finder')]`,
    hivRisk: `//a[contains(text(),'HIV Risk')]`,
    editAnswersArr: `.question-label.ng-binding`, // * Ex: $$(sel.editAnswersArr)
    ddSelect: `//select`, // ! Generic


    hhBtnNext: `//button[contains(text(),'Next')]`,
    hhMultiBtn: `.option-buttons`, // `//button[contains(@class,'option-buttons')]`
    hhDDAge: `#age`,
    hhLocation: `//input[contains(@class,'housing-helper-text-input')]`,
    hhSpinner: `//div[@class='spinner']`,
    hhStep1: `//h2[text()='Step 1']`,
    hhStep2: `//h2[text()='Step 2']`,
    hhStep3: `//h2[text()='Step 3']`,
    hhRestartAssessment: `//button[text()='Restart']`,
}