import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Welcome!');
  });

  it('should find the signup submit button and click', () => {
    element(by.id('signupFormSubmit')).click();
    expect(page.getUserMessageText()).toEqual('Please enter valid details');
  });

  it('should fill the form fields, submit button, get success message', () => {
    const firstName = element(by.id('signupFormFirstName'));
    firstName.sendKeys('Tester');
    expect(firstName.getAttribute('value')).toEqual('Tester');

    const lastName = element(by.id('signupFormLastName'));
    lastName.sendKeys('Tester');
    expect(firstName.getAttribute('value')).toEqual('Tester');

    const email = element(by.id('signupFormEmail'));
    email.sendKeys('tester@test.com');
    expect(email.getAttribute('value')).toEqual('tester@test.com');

    const password = element(by.id('signupFormPassword'));
    password.sendKeys('Tu123456');
    expect(password.getAttribute('value')).toEqual('Tu123456');

    const confirmPassword = element(by.id('signupFormConfirmPassword'));
    confirmPassword.sendKeys('Tu123456');
    expect(confirmPassword.getAttribute('value')).toEqual('Tu123456');

    element(by.id('signupFormSubmit')).click();
    expect(page.getUserMessageText()).toEqual('Thank you for sign-up! See you soon!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
