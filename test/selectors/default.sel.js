export default {
    signUp: `//a[contains(text(),'Sign up')]`,
    logIn: `//a[contains(text(),'Login')]`,
    btnCreateAccount: `//button[contains(text(),'Create an account')]`,
    btnContinue: `//button[contains(text(),'Continue')]`,
    btnConnect: `//button[contains(text(),'Connect')]`,
    modalSignUp: `.modal-signup.ng-scope`,
    txtEmailPhone: `#signup_emailOrPhone`,
    txtPassword: `#signup_password`,
    chkNonProfit: `//span[contains(text(),'I work at a nonprofit')]`, // unnecessary?
    chkBox: `//input[@type="checkbox"]`, // generic
    txtLocationSetters: `*[id*="location_setter"]`,
    langEnglish: `//label[value="en"]`,
    langSpanish: `//label[value="es"]`,
    txtFirstName: `//input[@placeholder='First name' and @aria-hidden='false']`,
    txtLastName: `//input[@placeholder='Last name' and @aria-hidden='false']`,
    txtOrg: `#org-search_value`,
    txtPosition: `//input[@placeholder="Position" and @aria-hidden="false"]`,
    txtPhone: `//input[@placeholder='Cell phone' and @aria-hidden='false']`, // `input[ui-mask="999-999-9999"]`,
    ddDOBDay: `//button[contains(text(),'Day')]`,
    ddDOBMonth: `//button[contains(text(),'Month')]`,
    ddDOBYear: `//button[contains(text(),'Year')]`,
    ddArray: `//ul[@class='dropdown-menu']`, // [1] = Day, [2] = Month, [3] = Year
    smallMenuBtn: `//a[@class='btn']`,
    smallAssessments: `//a[@href='/plan#assessments' and @ng-click='toggleSideBar()']`,
    smallSignUp: `//a[@ng-click='openSignupModal(); toggleSideBar()']`, // `a[ng-click='openSignupModal(); toggleSideBar()']>i`  `//a[@ng-click='openSignupModal(); toggleSideBar()']`
    smallDismissApp: `span.app-bar-dismiss`,
}