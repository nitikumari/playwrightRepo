const{expect}=require("@playwright/test");

class AccountOverViewPage
{
    constructor(page)
    {
        this.page=page;
        this.total=page.locator("//b[normalize-space()='Total']");
        this.balance=page.locator("//b[normalize-space()='Total']/parent::td/following-sibling::td/b");
        this.existingAccountNumber=this.page.locator("//table[1]/tbody[1]/tr[1]/td[1]/a[1]");
        this.accountOverViewLink=this.page.locator("//a[normalize-space()='Accounts Overview']");

    }
    async accountTotalBalance()
    {
       
        const Balance =await this.balance.textContent();
        return Balance;

    }
    async existingAccountDetail()
    {
const existingAccount=await this.existingAccountNumber.textContent();
return existingAccount;
    }
}

module.exports={AccountOverViewPage};