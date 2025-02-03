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

const homePage=poManager.getHomePage();
await homePage.globalNavigationMenu();
await homePage.accountOverviewClick();

const accountOverViewPage=await poManager.getAccountOverviewPage();

const BalanceBefore=await accountOverViewPage.accountTotalBalance();
const accountNumber=await homePage.openNewAccount();
console.log("account number is "+accountNumber);
console.log("Step 4: Open new account and capture the account Number");
try{
if(accountNumber)
console.log("Pass: Account number is captured successfully "+accountNumber);
}
catch(e)
{
    console.error("Step 4 Failed: Unable to open new account, Please check logs"+e);
}


await homePage.accountOverviewClick();
const BalanceAfter=await accountOverViewPage.accountTotalBalance();
try{
    console.log("Step 5: Checking the Account Overview screen display the balance details as expected")
expect(BalanceBefore===BalanceAfter).toBeTruthy;
console.log("Pass: Balance detail is as expected: "+BalanceAfter);
}
catch(e)
{
    console.error("Step 5 Failed: Unable to open new account, Please check logs"+e);

}

const existingAccount=await accountOverViewPage.existingAccountDetail();
console.log("existing account is "+existingAccount);
await homePage.transferFund(accountNumber,existingAccount,dataSet);
//await homePage.payBill(accountNumber,existingAccount);
const payBillPage=poManager.getPayBillPage();
await payBillPage.payBilLService(accountNumber,dataSet);
const amount=dataSet.amount;
const txnData={accountNumber,amount};
fs.writeFileSync('txnData.json',JSON.stringify(txnData));



})

