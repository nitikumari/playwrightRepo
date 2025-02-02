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
    }

}
module.exports={LoginPage};
