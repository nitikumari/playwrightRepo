const {test, expect} = require('@playwright/test');
const{Utility}=require('../allUtils/Utility');
const {POManager} = require('../pageObjects/POManager');
const dataSet=JSON.parse(JSON.stringify(require("../allUtils/placeHolderData.json")));
const fs=require('fs');


test('paraBank UI Test', async ({browser})=>
{
 
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager=new POManager(page);
  
  


//const payBillPage=poManager.getPayBillPage();
//const newAccountPage=poManager.getNewAccountPage();

const utility=new Utility(page);

const randomUsername = 'user_' + await utility.generateRandomString(8); 

console.log(randomUsername);

const welcomePage=poManager.getWelcomePage();
await welcomePage.goTo();
await welcomePage.registerNewUser(randomUsername,dataSet);

const loginPage=poManager.getLoginPage();
await loginPage.login(randomUsername,dataSet);
await context.storageState({ path: 'dataAuth.json' });

const accountOverViewPage=poManager.getAccountOverviewPage();
const BalanceBefore=await accountOverViewPage.accountTotalBalance();

const homePage=poManager.getHomePage();
const accountNumber=await homePage.openNewAccount();
console.log("account number is "+accountNumber);

await homePage.accountOverviewClick();

const BalanceAfter=await accountOverViewPage.accountTotalBalance();
expect(BalanceBefore===BalanceAfter).toBeTruthy;
const existingAccount=await accountOverViewPage.existingAccountDetail();
console.log("existing account is "+existingAccount);
await homePage.transferFund(accountNumber,existingAccount,dataSet);
//await homePage.payBill(accountNumber,existingAccount);
const payBillPage=poManager.getPayBillPage();
await payBillPage.payBilLService(accountNumber,dataSet);
const amount=dataSet.amount;
const txnData={accountNumber,amount};
fs.writeFileSync('txnData.json',JSON.stringify(txnData));


//<input id="986d29f8-d6d6-4313-8fe8-8fff18a2436c" class="input phone-number-986d29f8-d6d6-4313-8fe8-8fff18a2436c" name="payee.phoneNumber">
})

