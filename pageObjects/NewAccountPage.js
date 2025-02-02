class NewAccountPage{
    constructor(page)
    {
        this.page=page;
        this.accountNumber=page.locator("//a[@id='newAccountId']");

    }
    async newAccountDetails()
    {
        await this.accountNumber.click();


    }
}

module.exports={NewAccountPage};
