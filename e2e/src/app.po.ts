import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getHeadingText() {
    // Get the signup page heading element reference
    return element(by.css('.signup__container h1')).getText();
  }
  getUserMessageText() {
    // Get the signup page message element reference
    return element(by.css('.user-msg')).getText();
  }
}
