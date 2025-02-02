const { expect } =require("@playwright/test");

class PayBillPage
{
    constructor(page)
    {
        this.page=page;
        this.payeeN=page.locator("//input[@name='payee.name']");
        this.address=page.locator("//input[@name='payee.address.street']");
        this.city=page.locator("//input[@name='payee.address.city']");
        this.state=page.locator("//input[@name='payee.address.state']");
        this.zipCode=page.locator("//input[@name='payee.address.zipCode']");
        this.phone=page.locator("input[name=payee\\.phoneNumber]");
        this.account=page.locator("//input[@name='payee.accountNumber']");
        this.verifyAccount=page.locator("//input[@name='verifyAccount']");
        this.amount=page.locator("//input[@name='amount']");
        this.fromAccount=page.locator("//select[@name='fromAccountId']");
        this.sendPayment=page.locator("//input[@value='Send Payment']")
        this.billPaymentSuccessful=page.locator("//h1[normalize-space()='Bill Payment Complete']");
        this.findTransaction=page.locator("//a[normalize-space()='Find Transactions']");
        this.findByAmount=page.locator("document.querySelector('#amount')")
        this.findTransactionclick=page.locator("//button[@id='findByAmount']")
        this.payBill=page.locator("//a[normalize-space()='Bill Pay']");
        //input[@name='payee.name']
        //*[@id="billpayForm"]/form/table/tbody/tr[1]/td[2]/input
   
      //input[@name='payee.name']

      


    }
    async payBilLService(accountNumber,dataSet)
    {
        await this.payBill.click();
      
       // await this.page.waitForNavigation(); 
       
       
           // Debug: Log if the element is enabled
           //const isEnabled = await this.payeeN.isEnabled();
           //console.log("Is Payee Name input enabled?", isEnabled);
   
        await this.payeeN.fill(dataSet.payee);
        await this.address.fill(dataSet.address);
        await this.city.fill(dataSet.city);
        await this.state.fill(dataSet.state);
        await this.zipCode.fill(dataSet.zipCode);
        await this.phone.fill(dataSet.PhoneNumber);
        await this.account.fill(dataSet.account);
        await this.verifyAccount.fill(dataSet.account);
        await this.amount.fill(dataSet.amount);
        await this.fromAccount.selectOption(accountNumber);
        await this.sendPayment.click();
       const text= await this.billPaymentSuccessful.textContent();
        expect(text).toContain("Bill Payment Complete");
      //  this.findTransaction.click();

    ///this.findByAmount.fill("10");
    //this.findTransactionclick.click();

    

  /*  https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/13566/transactions/amount/10?timeout=30000
    cookie=JSESSIONID=1EDAD95D4576FD78B0F37C6924B3231B

    [
        {
            "id": 14809,
            "accountId": 13566,
            "type": "Credit",
            "date": 1738368000000,
            "amount": 10.00,
            "description": "Funds Transfer Received"
        }
    ]
    */

        
     }
}
module.exports={PayBillPage};

