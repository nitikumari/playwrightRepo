
class WelcomePage{
    constructor(page)
    {
        this.page=page;
        //this.registerButton=page.locator('//*[@id="loginPanel"]/p[2]/a');
  
        this.registerButton=page.locator("//*[@id='loginPanel']/p[2]/a");
        this.firstName=page.locator("//input[@id='customer.firstName']");
        this.lastName=page.locator("//input[@id='customer.lastName']");
        this.address=page.locator("//input[@id='customer.address.street']");
        this.city=page.locator("//input[@id='customer.address.city']");
        this.state=page.locator("//input[@id='customer.address.state']");
        this.zipCode=page.locator("//input[@id='customer.address.zipCode']");
        this.phonenNumber=page.locator("//input[@id='customer.phoneNumber']");
        this.ssn=page.locator("//input[@id='customer.ssn']");
  
        this.userName=page.locator("//input[@id='customer.username']");
        this.password=page.locator("//input[@id='customer.password']");
        this.confirmPassword=page.locator("//input[@id='repeatedPassword']");
        this.register=page.locator("//input[@value='Register']");
        //input[@name='username']
        //input[@value='Register']
        this.logout=page.locator("//a[normalize-space()='Log Out']");
    
    }

    async goTo()
    {
        await this.page.goto("https://parabank.parasoft.com/parabank/register.htm");
        //{
       // timeout:60000,
       // waitUntil:'load',
    
}
    async registerNewUser(randomUsername,dataSet)
    {
     
   
await this.registerButton.click();


await this.firstName.fill(dataSet.firstname);
await this.lastName.fill(dataSet.lastName);
await this.address.fill(dataSet.address);
await this.city.fill(dataSet.city);
await this.state.fill(dataSet.state);
await this.zipCode.fill(dataSet.zipCode);
await this.phonenNumber.fill(dataSet.PhoneNumber);
await this.ssn.fill(dataSet.ssn);

//await this.userName.fill(randomUsername);

await this.userName.fill(randomUsername);
//onsole.log("user name is "+uniqueUserName);
await this.password.fill(dataSet.password);
await this.confirmPassword.fill(dataSet.confirmPassword);
await this.register.click();
await this.logout.click();




    }
}
module.exports={WelcomePage};

