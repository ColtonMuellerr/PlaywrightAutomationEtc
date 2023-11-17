using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace PlaywrightTests;

[TestClass]
public class TestDTVaudit : PageTest
{
    [TestMethod]
    public async Task LoadDTVauditMForms()
    {
        var config = TestSetup.Instance.PlaywrightConfig;

        //await Page.GotoAsync("https://mforms-dev.mastecat.net/dtvsignatureaudit/create");
        await Page.GotoAsync(config.BaseUrl);

        await Page.Locator("#txt_userName").ClickAsync();

        //await Page.Locator("#txt_userName").FillAsync("51180");
        await Page.Locator("#txt_userName").FillAsync(config.GkUserAdmin);

        await Page.Locator("#txt_password").ClickAsync();

        //await Page.Locator("#txt_password").FillAsync("eotW2!_7");
        await Page.Locator("#txt_password").FillAsync(config.GkPassAdmin);

        await Page.GetByRole(AriaRole.Button, new() { Name = "Login" }).ClickAsync();

        await Page.GotoAsync("https://mforms-dev.mastecat.net/dtvsignatureaudit/create");

        await Page.GetByLabel("Employee ID").ClickAsync();

        await Page.GetByLabel("Employee ID").FillAsync("51180");

        await Page.GetByLabel("Number of audits performed").ClickAsync();

        await Page.GetByLabel("Number of audits performed").FillAsync("1");

        await Page.GetByLabel("Number of passing audits").ClickAsync();

        await Page.GetByLabel("Audit Activity Number").ClickAsync();

        await Page.GetByLabel("Audit Activity Number").FillAsync("1234");

        await Page.GetByLabel("Number of passing audits").ClickAsync();

        await Page.GetByLabel("Number of passing audits").FillAsync("1");

        await Page.GetByLabel("Number of failed audits").ClickAsync();

        await Page.GetByLabel("Number of failed audits").FillAsync("0");

        await Page.GetByLabel("Findings on failed audits").ClickAsync();

        await Page.GetByLabel("Findings on failed audits").FillAsync("none");

        await Page.GetByRole(AriaRole.Button, new() { Name = "Submit" }).ClickAsync();

        await Page.GotoAsync("https://mforms-dev.mastecat.net/");

    }

    
}




