global.fetch = require("node-fetch");
const GeminiAPI = require("gemini-api").default;

const secret = "my_Secret_Key";
const key = "my_secret_account_Key";
const ccAPI_Key = "CryptoCompare_API_Key";

const restClient = new GeminiAPI({key, secret, sandbox:true});

 
const indicators = require("./movingAvg.js")

movingAverage('BTC', 'USD', 50, function(result)
{
    console.log("MA: ", result)
})