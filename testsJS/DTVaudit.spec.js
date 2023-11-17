//import { test, expect } from '@playwright/test';

const { test } = require('../mytest');
const { expect } = require('@playwright/test');

test('test 1', async ({ page, person }, testInfo) => {
  //Opens login page for MForms dev
  await page.goto(person.web);
  await expect(page).toHaveTitle('Gatekeeper Login');
  
  //Clicks on Username Field and fills
  //await page.locator('#txt_userName').click();
  //await page.locator('#txt_userName').fill('51180');

  //Clicks on Password field and fills
  //await page.locator('#txt_password').click();
  //await page.locator('#txt_password').fill('eotW2!_6');

  await page.locator('#txt_userName').click();
  await page.locator('#txt_userName').fill(person.username);
  await page.locator('#txt_password').click();
  await page.locator('#txt_password').fill(person.password);

  const screenshot = await page.screenshot();
  await testInfo.attach("Login Screen", {
    contentType: "image/png",
    body: screenshot
  })

  //Clicks the login button
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto(person.web2);

  //Clicks and fills each needed label
  await page.getByLabel('Employee ID').click();
  await page.getByLabel('Employee ID').fill('51180');
  
  await page.getByLabel('Number of audits performed').click();
  await page.getByLabel('Number of audits performed').fill('1');
  await page.getByLabel('Number of passing audits').click();
  await page.getByLabel('Audit Activity Number').click();
  await page.getByLabel('Audit Activity Number').fill('1234');
  
  await page.getByLabel('Number of passing audits').click();
  await page.getByLabel('Number of passing audits').fill('1');

  await page.getByLabel('Number of failed audits').click();
  await page.getByLabel('Number of failed audits').fill('0');

  await page.getByLabel('Findings on failed audits').click();
  await page.getByLabel('Findings on failed audits').fill('None');

  await expect.soft(page.getByText('Employee Found'), 'Employee ID not found').toHaveText('Employee Found');

  //Submits and returns back to home MForms
  await page.getByRole('button', { name: 'Submit' }).click();
  await testInfo.attach("submited", {
    contentType: "image/png",
    body: await page.screenshot()
  })
  await page.goto('https://mforms-dev.mastecat.net/');
});