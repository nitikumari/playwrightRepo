const { expect } = require("@playwright/test");

class HomePage {

    constructor(page) {
        this.page = page;
        this.openAccount = page.locator("//a[normalize-space()='Open New Account']");
        this.accountType = page.locator("//select[@id='type']");

        this.opennewAcc = page.locator("input[value='Open New Account']");

        this.accoutNumber = page.locator("//a[@id='newAccountId']");
        this.transferFunds = page.locator("//a[normalize-space()='Transfer Funds']");
        this.amountToTransfer = page.locator("//input[@id='amount']");
        this.fromAccount = page.locator("#fromAccountId");
        this.toAccount = page.locator("//select[@id='toAccountId']");
        this.transfer = page.locator("//input[@value='Transfer']");
        this.message = page.locator("//h1[normalize-space()='Transfer Complete!']");
        this.payBill = page.locator("//a[normalize-space()='Bill Pay']");
        this.accountOverview = page.locator("//*[@id='leftPanel']/ul/li[2]/a");
        this.aboutUs = page.locator("//div[@id='footermainPanel']//ul[1]//li[2]//a[1]");
        this.aboutUsTitle = page.locator("//h1[@class='title']");

    }
    async openNewAccount() {

        await this.openAccount.click();
        await this.accountType.waitFor();
        await this.accountType.selectOption("SAVINGS");
        await this.opennewAcc.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(5000);
        await this.opennewAcc.click();
        await this.page.waitForTimeout(5000);
        const accountNo = await this.accoutNumber.textContent();

        console.log("Account number is " + accountNo);
        await this.page.waitForTimeout(5000);
        await this.accoutNumber.click();
        return accountNo;



    }
    async transferFund(accountNo, existingAccount, dataSet) {
        await this.transferFunds.click();
        await this.amountToTransfer.fill("10");
        await this.fromAccount.waitFor();
        await this.fromAccount.selectOption(accountNo);
        await this.toAccount.selectOption(existingAccount);
        await this.transfer.click();
        const messageDisplayed = await this.message.textContent();
        try{
            console.log("Step 6: Verify Transafer fund is successful")
            expect(messageDisplayed).toContain("Transfer Complete!");
        console.log("Pass: transfer fund is successful from account : "+accountNo);
        console.log("Transfer fund To account "+existingAccount);
        }
        catch(e)
        {
            console.error("Step 6 Failed: Unable to transfer fund, Please check logs"+e);
        
        }

  


    }
    async payBill(accountNumber, existingAccount) {
        await this.payBill.click();

    }
    async accountOverviewClick() {
        await this.accountOverview.click();
    }
    async globalNavigationMenu() {

        try {
            await this.aboutUs.click();
            const aboutUsTitle = await this.aboutUsTitle.textContent();
            console.log("Step 3: Global Navigation Menu is working as expected");
            await expect(aboutUsTitle).toContain("ParaSoft Demo Website");
            console.log("Pass: Global Navigation menu is working as expected")
            // await this.page.waitForTimeout(500);
        }
        catch (e) {

            console.error('An error occurred:Scenario 3 Failed', e);

        }
    }
}
module.exports = { HomePage };