const{test, expect, request}=require('@playwright/test');
const fs=require('fs');

const dataAuth=JSON.parse(fs.readFileSync('dataAuth.json','utf8'));
const jsessionCookie=dataAuth.cookies.find(cookie=>cookie.name==='JSESSIONID');

test('Find Transaction',async({browser})=>
{

    const context = await browser.newContext({
        extraHTTPHeaders: {
          'Accept': '*/*', 
          'Cookie': `${jsessionCookie.name}=${jsessionCookie.value}`, 
          'Host': 'parabank.parasoft.com', 
          'Referer': 'https://parabank.parasoft.com/parabank/findtrans.htm' 
        }
      });
    
  
      const transactionData = JSON.parse(fs.readFileSync('txnData.json', 'utf8'));
      const { accountNumber, amount } = transactionData;
    
      console.log(`Searching for transaction: Account Number - ${accountNumber}, Amount - ${amount}`);
    

      const apiUrl = `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountNumber}/transactions/amount/${amount}?timeout=30000`;
    
  
      const response = await context.request.get(apiUrl);
    

      console.log(`Response Status: ${response.status()}`);
      console.log(`Response Headers: ${JSON.stringify(response.headers())}`);
    
  
      if (response.status() === 401) {
        console.error('401 Unauthorized');
        return;
      }
    
   
      if (!response.headers()['content-type']?.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Response is not JSON. Response text:', textResponse);
        throw new Error('Expected JSON response but got a different content type');
      }
    
  
      let responseData;
      try {
        responseData = await response.json();
        console.log("Response Data:", responseData);
        //const matchedTransaction = expresponseData.amount === paymentAmount && responseData.accountNumber === accountNumber
        
        
        //  expect(matchedTransaction).toBeDefined();
          //xpect(response.status().toBe('200'));
          const matchedTransaction = responseData.find(tx => {
            return String(tx.amount) === String(amount) && String(tx.accountId) === String(accountNumber);
        });
    
        // Validate if the transaction is found and matches the criteria
        expect(matchedTransaction).toBeDefined();
        expect(String(matchedTransaction.amount)).toBe(String(amount));
      

        
        
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        throw new Error("Response is not in JSON format");
      }
    
    
      });



