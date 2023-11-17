const { test } = require('../mytest');
const { expect } = require('@playwright/test');

const photoPath = 'picturefile/Capture.PNG';

test('CovidForm', async ({ page, person }, testInfo) => {
    test.setTimeout(120000);
  await page.goto('https://mforms-dev.mastecat.net/Covid19VaccineCard/Create');
  await expect(page).toHaveTitle('Gatekeeper Login');

  await page.locator('#txt_userName').click();
  await page.locator('#txt_userName').fill(person.username);
  await page.locator('#txt_password').click();
  await page.locator('#txt_password').fill(person.password);

  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://mforms-dev.mastecat.net/Covid19VaccineCard/Create');

  await expect(page.locator('#covid19')).toContainText('');

  await expect(page.locator('#covid19')).toContainText('');

  await page.locator('label').filter({ hasText: 'I am fully vaccinated and am willing to upload appropriate documentation.' }).getByRole('insertion').click();
  await page.setInputFiles("input[type='file']", photoPath)

  await testInfo.attach("Covidpic", {
    contentType: "image/png",
    body: await page.screenshot()
  });

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.goto('https://mforms-dev.mastecat.net/');
});