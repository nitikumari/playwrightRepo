const { LoginPage } = require("./LoginPage");
const { WelcomePage } = require("./WelcomePage");
const {HomePage}=require("./HomePage");
const{AccountOverViewPage}=require("./AccountOverViewPage");
const{PayBillPage}=require("./PayBillPage");
const{NewAccountPage}=require("./NewAccountPage");

class POManager
{
    constructor(page)
    {
        this.welcomePage=new WelcomePage(page);
         this.loginPage=new LoginPage(page);
        this.homePage=new HomePage(page);
        this.accountOverViewPage=new AccountOverViewPage(page);
        this.newAccountPage=new NewAccountPage(page);
        this.payBillPage=new PayBillPage(page);
    }
    getLoginPage()
    {
        return this.loginPage;
    }
    getHomePage()
    {
        return this.homePage;
    }
    getWelcomePage()
    {
        return this.welcomePage;
    }
    getAccountOverviewPage()
    {
        return this.accountOverViewPage;
    }
    getNewAccountPage()
    {
        return this.newAccountPage;
    }
    getPayBillPage()
    {
        return this.payBillPage;
    }

    
}
module.exports={POManager};