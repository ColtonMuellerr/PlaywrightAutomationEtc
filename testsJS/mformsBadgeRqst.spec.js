const { test } = require('../mytest');
const { expect } = require('@playwright/test');

const photoPath = 'picturefile/Capture.PNG';

test('BadgeRequest', async ({ page, person }, testInfo) => {
    test.setTimeout(120000);
  await page.goto('https://mforms-dev.mastecat.net/BadgeRequest/Create');
  await expect(page).toHaveTitle('Gatekeeper Login');

  await page.locator('#txt_userName').click();
  await page.locator('#txt_userName').fill(person.username);
  await page.locator('#txt_password').click();
  await page.locator('#txt_password').fill(person.password);

  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://mforms-dev.mastecat.net/BadgeRequest/Create');

  await page.getByRole('button', { name: 'OK' }).click();

  await expect(page.getByLabel('Employee ID')).toContainText('');
  await expect(page.getByLabel('Employee Name')).toContainText('');
  //await page.getByLabel('Employee Email Address').click();
  //await page.getByLabel('Position/Title').click();

    await page.getByRole('combobox', { name: 'Employee/Tech Type' }).selectOption('Employee');

    await page.getByRole('combobox', { name: 'Employee/Tech Type' }).selectOption('Sub_Contractor');

    //await page.getByLabel('Contractor Company Name').click();
    await expect(page.getByLabel('Contractor Company Name')).toContainText('');
    //await page.getByLabel('Contractor Company Phone Number').click();
    await expect(page.getByLabel('Contractor Company Phone Number')).toContainText('');


  await page.locator('label').filter({ hasText: 'DIRECTV' }).getByRole('insertion').click();
  await page.getByRole('combobox', { name: 'Request Type' }).selectOption('Reprint (Lost/Damaged Badge)');
  await page.getByLabel('DMA/Market Worked').click();
  await page.getByLabel('DMA/Market Worked').fill('Market');
  await page.getByLabel('Home Office', { exact: true }).click();
  await page.locator('#badge-request div').filter({ hasText: 'Ship to Home Office' }).getByRole('insertion').dblclick();
  await page.getByLabel('Shipping Address').click();
  await page.getByLabel('Comments').click();
  await page.getByLabel('Comments').fill('None');
  await page.setInputFiles("input[type='file']", photoPath)
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await page.goto('https://mforms-dev.mastecat.net/');
});