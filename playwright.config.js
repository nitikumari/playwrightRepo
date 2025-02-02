const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :0,
  
 
timeout: 50 * 10000,
  expect: {
  
    timeout: 5000
  },
  
reporter: 'html',
 
  use: {

    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'on',//off,on
    
    
    
  },


};

module.exports = config;