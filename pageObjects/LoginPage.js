const { WelcomePage } = require("./WelcomePage");

class LoginPage{
    constructor(page)
    {
        this.page=page;
        this.userNameLogin=page.locator("//input[@name='username']");
        this.passWordLogin=page.locator("//input[@name='password']");
        this.loginIn=page.locator("//input[@value='Log In']");

    }
    async login(randomUsername,dataSet)
    {
       // console.log("user name is "+randomUsername);
       
        //await this.userNameLogin.fill(randomUsername);
        await this.userNameLogin.fill(randomUsername);
    await this.passWordLogin.fill(dataSet.password);
        await this.loginIn.click();
       // console.log("Validating the user Name ");

  //await expect(page).toHaveTitle(/Playwright/);
    }

}
module.exports={LoginPage};

//div[@id='footermainPanel']//ul[1]//li[2]//a[1]

//h1[@class='title']
//ParaSoft Demo Website//
