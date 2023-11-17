using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;
using Microsoft.VisualStudio.TestTools.UnitTesting;



namespace PlaywrightTests;

[TestClass]
public class TestCovid : PageTest
{
    [TestMethod]
    public async Task LoadCovidMForms()
    {

        var config = TestSetup.Instance.PlaywrightConfig;

        
        await Page.GotoAsync(config.BaseUrl);

        await Page.Locator("#txt_userName").ClickAsync();

        await Page.Locator("#txt_userName").FillAsync(config.GkUserAdmin);

        await Page.Locator("#txt_password").ClickAsync();

        await Page.Locator("#txt_password").FillAsync(config.GkPassAdmin);

        await Page.GetByRole(AriaRole.Button, new() { Name = "Login" }).ClickAsync();

        await Page.GotoAsync("https://mforms-dev.mastecat.net/Covid19VaccineCard/Create");
        await Expect(Page).ToHaveTitleAsync("MForms - COVID-19 Vaccine Status");

        var locator = Page.Locator("#covid19");
        await Expect(locator).ToContainTextAsync("51180");

        await Page.Locator("label").Filter(new() { HasText = "I am fully vaccinated and am willing to upload appropriate documentation." }).GetByRole(AriaRole.Insertion).ClickAsync();

        //await Page.GetByRole(AriaRole.Button, new() { Name = "Add Photo" }).ClickAsync();

        //await Page.GetByRole(AriaRole.Button, new() { Name = "Add Photo" }).SetInputFilesAsync("");
        

        var fileChooser = await Page.RunAndWaitForFileChooserAsync(async ()=>
         {
            await Page.GetByText("Add Photo").ClickAsync();
         });
         await fileChooser.SetFilesAsync("Capture.PNG");

         /*await Page.ScreenshotAsync(new()
         {
            Path = "screenshot1.png",
            FullPage = true,
         });*/

         await Page.GetByRole(AriaRole.Button, new() { Name = "Submit" }).ClickAsync();

        //await Page.GotoAsync("https://mforms-dev.mastecat.net/");

    }
}
