const { expect } = require("@playwright/test");

class HomePage{
   
    constructor(page)
    {
        this.page=page;
        this.openAccount=page.locator("//a[normalize-space()='Open New Account']");
        this.accountType=page.locator("//select[@id='type']");
    
        this.opennewAcc=page.locator("input[value='Open New Account']");
    
        this.accoutNumber=page.locator("//a[@id='newAccountId']");
        this.transferFunds=page.locator("//a[normalize-space()='Transfer Funds']");
        this.amountToTransfer=page.locator("//input[@id='amount']");
        this.fromAccount=page.locator("#fromAccountId");
        this.toAccount=page.locator("//select[@id='toAccountId']");
        this.transfer=page.locator("//input[@value='Transfer']");
        this.message=page.locator("//h1[normalize-space()='Transfer Complete!']");
        this.payBill=page.locator("//a[normalize-space()='Bill Pay']");
        this.accountOverview=page.locator("//*[@id='leftPanel']/ul/li[2]/a");

    }
    async openNewAccount()
    {
   
       await this.openAccount.click();
       await this.accountType.waitFor();
      await  this.accountType.selectOption("SAVINGS");
      await this.opennewAcc.waitFor({ state: 'visible' });
      await this.page.waitForTimeout(5000);
      await this.opennewAcc.click();
      await this.page.waitForTimeout(5000);
       const accountNo= await this.accoutNumber.textContent();
   
        console.log("Account number is "+accountNo);
        await this.page.waitForTimeout(5000);
       await this.accoutNumber.click();
       return accountNo;
     
       

    }
    async transferFund(accountNo,existingAccount,dataSet)   
    {
        await this.transferFunds.click();
        await this.amountToTransfer.fill("10");
        await this.fromAccount.waitFor();
        await this.fromAccount.selectOption(accountNo);
        await this.toAccount.selectOption(existingAccount);
        await this.transfer.click();
        const messageDisplayed=await this.message.textContent();
   
        expect(messageDisplayed).toContain("Transfer Complete!");


    }
    async payBill(accountNumber,existingAccount)
    {
        await this.payBill.click();

    }
    async accountOverviewClick()
    {
        await this.accountOverview.click();
    }
}
module.exports={HomePage};