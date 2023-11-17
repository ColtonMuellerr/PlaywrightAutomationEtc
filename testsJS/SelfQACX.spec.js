const { test } = require('../mytest');
const { expect } = require('@playwright/test');

const path = require('path');

test('test 1', async ({ page, person }, testInfo) => {
    test.setTimeout(120000);
  await page.goto('https://mforms-dev.mastecat.net/SelfQacx/Create');

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
  await page.goto('https://mforms-dev.mastecat.net/selfqacx/create');

  const photoPath = 'picturefile/Capture.PNG';


  await page.getByLabel('Activity Number').click();

  await page.getByLabel('Account Number').click();
  await page.getByLabel('Account Number').fill('51180');

  await page.getByLabel('Activity Date').click();

  await page.getByRole('combobox', { name: 'Product Type' }).selectOption('DIRECTV');
  await page.getByRole('combobox', { name: 'Activity Type' }).selectOption('InstallUpgrade');

  await page.getByRole('listitem').filter({ hasText: 'I operated my vehicle safely, and backed in, minimizing any risks. Yes No' }).getByRole('insertion').nth(1).click();
  
  await page.locator('#VehicleSafetyFailures').click();
  await page.locator('#VehicleSafetyFailures').fill('none');
  
  await page.getByRole('listitem').filter({ hasText: 'I placed safety cones at the front and rear bumpers of my vehicle, and performed' }).getByRole('insertion').first().click();
  await page.getByRole('listitem').filter({ hasText: 'I have ALL of the PPE (Personal Protective Equipment) to do this job safely, and' }).getByRole('insertion').first().click();
  await page.getByRole('listitem').filter({ hasText: 'I put on shoe covers to protect the customer’s home. Yes No' }).getByRole('insertion').first().click();
  
  await page.setInputFiles("input[type='file']", photoPath)

  await testInfo.attach("Cabphoto", {
    contentType: "image/png",
    body: await page.screenshot()
  });

  await page.setInputFiles("input[type='file']", photoPath)

  
  
  await page.getByRole('listitem').filter({ hasText: 'I conducted a pre-installation walk-through with the customer and captured the c' }).getByRole('insertion').nth(1).click();
  
  await page.locator('#PreInstallationWalkthroughInstallUpgradeFailures').click();
  await page.locator('#PreInstallationWalkthroughInstallUpgradeFailures').fill('None');
  
  await page.getByRole('listitem').filter({ hasText: 'I performed a site survey and determined I could do this job safely. Yes No' }).getByRole('insertion').first().click();
  await page.getByRole('listitem').filter({ hasText: 'NEC Zone of Protection (ZoP) Bonding used.' }).getByRole('insertion').click();
  
  //await page.locator('#CableRoutingEntryPoint').getByRole('button', { name: 'Add Photo' }).click();
  //await page.locator('#CableRoutingEntryPoint').getByRole('button', { name: 'Add Photo' }).setInputFiles('comit.PNG');
  await page.setInputFiles("input[type='file']", photoPath)
  
  //await page.locator('#MeshTestSystemTest').getByRole('button', { name: 'Add Photo' }).click();
  //await page.locator('#MeshTestSystemTest').getByRole('button', { name: 'Add Photo' }).setInputFiles('git push.PNG');
  await page.setInputFiles("input[type='file']", photoPath)
  
  //await page.locator('#OduMount').getByRole('button', { name: 'Add Photo' }).click();
  //await page.locator('#OduMount').getByRole('button', { name: 'Add Photo' }).setInputFiles('capturevsclone.PNG');
  
  
  await page.setInputFiles("input[type='file']", {
    name: 'file.PNG',
    mimeType:'text/png',
    buffer: Buffer.from('this,is,test')
  });
  

  await testInfo.attach("Odumount", {
    contentType: "image/png",
    body: await page.screenshot()
  });
  
  await page.locator('#OduMountUsed').selectOption('UNDER EAVE MOUNT');
  
  //await page.locator('#OduAssembly').getByRole('button', { name: 'Add Photo' }).click();
  //await page.locator('#OduAssembly').getByRole('button', { name: 'Add Photo' }).setInputFiles('Picture1.png');
  await page.setInputFiles("input[type='file']", photoPath)
  
  await page.getByRole('listitem').filter({ hasText: 'Was there any portion of the install not able to be brought up to AT&T specs? Ye' }).getByRole('insertion').first().click();
  
  await page.locator('#InstallToDirectvSpecificationsFailures').click();
  await page.locator('#InstallToDirectvSpecificationsFailures').fill('None');
  
  //await page.locator('#ElectricalOutletTester').getByRole('button', { name: 'Add Photo' }).click();
  //await page.locator('#ElectricalOutletTester').getByRole('button', { name: 'Add Photo' }).setInputFiles('final git.PNG');
  await page.setInputFiles("input[type='file']", photoPath)
  
 /* await page.locator('#ZopBondingWireAttachedToOutlet').getByRole('button', { name: 'Add Photo' }).click();
  await page.locator('#ZopBondingWireAttachedToOutlet').getByRole('button', { name: 'Add Photo' }).setInputFiles('captureVS2022mform.PNG');
  await page.locator('#ZopBondingWireAttachedToStb').getByRole('button', { name: 'Add Photo' }).click();
  await page.locator('#ZopBondingWireAttachedToStb').getByRole('button', { name: 'Add Photo' }).setInputFiles('comit.PNG');
  await page.locator('#ZopAppRendering').getByRole('button', { name: 'Add Photo' }).click();
  await page.locator('#ZopAppRendering').getByRole('button', { name: 'Add Photo' }).setInputFiles('git push.PNG');
  
  await page.locator('#AdditionalLaborOli').selectOption('No');
  
  await page.locator('#WirelessVideoBridgeOli').selectOption('Yes');
  await page.locator('#WirelessVideoBridgeOliPhotos').getByRole('button', { name: 'Add Photo' }).click();
  await page.locator('#WirelessVideoBridgeOliPhotos').getByRole('button', { name: 'Add Photo' }).setInputFiles('final git.PNG');
  */
  await page.locator('#CustomerBroadbandEligiable').selectOption('Yes');
  await page.locator('#ConnectSystemToInternet').selectOption('Yes');
  
  //await page.locator('#EightyEightCodePhotos').getByRole('button', { name: 'Add Photo' }).click();
  //await page.locator('#EightyEightCodePhotos').getByRole('button', { name: 'Add Photo' }).setInputFiles('captureVS2022mform.PNG');
  await page.setInputFiles("input[type='file']", photoPath)

  await testInfo.attach("88code", {
    contentType: "image/png",
    body: await page.screenshot()
  })
  
  await page.getByRole('listitem').filter({ hasText: 'I showed the customer my work during a post-installation/service site survey, an' }).getByRole('insertion').first().click();
  await page.getByRole('listitem').filter({ hasText: 'As a result of input from the customer during the post-installation/service surv' }).getByRole('insertion').first().click();
  await page.getByRole('listitem').filter({ hasText: 'I showed the customer the Protection Plan video, and offered DPP/PPP to protect ' }).getByRole('insertion').first().click();
  await page.getByRole('listitem').filter({ hasText: 'I left the Customer Satisfaction guide pointing out the opportunity to receive $' }).getByRole('insertion').first().click();
  await page.getByRole('listitem').filter({ hasText: 'I gave the customer the leave-behind pointing out that if he/she has any questio' }).click();
  await page.getByRole('listitem').filter({ hasText: 'I gave the customer the leave-behind pointing out that if he/she has any questio' }).getByRole('insertion').first().click();
  await page.getByRole('listitem').filter({ hasText: 'I reviewed the NPS question with the customer and asked him/her to take a few mo' }).getByRole('insertion').first().click();
  
  await page.getByLabel('Additional Comments').click();
  await page.getByLabel('Additional Comments').fill('None');

  await page.screenshot({ path: 'screenshots/screenshot.png' , fullPage: true });
  
  //await page.locator('#AdditionalPhotos').getByRole('button', { name: 'Add Photo' }).click();
  //await page.locator('#AdditionalPhotos').getByRole('button', { name: 'Add Photo' }).setInputFiles('git status cmd.PNG');
  await page.setInputFiles("input[type='file']", photoPath)
  
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.goto('https://mforms-dev.mastecat.net/');
});
