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
    chkBox: `input[type="checkbox"]`, // generic
    txtLocationSetters: `*[id*="location_setter"]`,
    langEnglish: `label[value="en"]`,
    langSpanish: `label[value="es"]`,
    txtFirstName: `input[placeholder="First name"][class="form-control form-control-top float_label ng-not-modified"]`,
    txtLastName: `input[placeholder="Last name"][class="form-control form-control-middle float_label ng-not-modified"]`,
    txtOrg: `#org-search_value`,
    txtPosition: `input[placeholder="Position"][class="form-control form-control-middle float_label ng-not-modified"]`,
    txtPhone: `div[ng-if="hasEmail()"]`, // `input[ui-mask="999-999-9999"]`,
    ddDOBDay: `//button[contains(text(),'Day')]`,
    ddDOBMonth: `//button[contains(text(),'Month')]`,
    ddDOBYear: `//button[contains(text(),'Year')]`,

}