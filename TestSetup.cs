using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightTests
{
    internal class TestSetup
    {
        private TestSetup() 
        {
            
        }

        public static TestSetup Instance { get 
            {
                lock (InstanceLock)
                {
                    if (instance?.PlaywrightConfig == null)
                    {
                        instance = new TestSetup();
                        instance.SetupAWS();
                    }
                    return instance;
                }
            } }

        private static TestSetup? instance = null;

        private static readonly object InstanceLock = new object();

        private void SetupAWS()
        {


            // Arrange
            var config = new ConfigurationBuilder()
                            .SetBasePath(Directory.GetCurrentDirectory())
                            .AddJsonFile("appsettings.json")
                            .AddSystemsManager(smsOptions =>
                            {
                                smsOptions.Path = "/at-app-dev.mastecat.net/MForms";
                                smsOptions.Optional = false;
                            })
                            .Build();
            var playwrightConfig = new PlaywrightConfig();
            config.Bind("Playwright", playwrightConfig);
            PlaywrightConfig = playwrightConfig;
        }

        public PlaywrightConfig PlaywrightConfig { get; private set; }
    }
}
