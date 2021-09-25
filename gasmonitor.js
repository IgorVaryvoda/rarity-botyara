const ethers = require("ethers");
const { parseUnits, formatUnits } = require("@ethersproject/units");
const fs = require('fs')
var colors = require("colors");

let keys = require("dotenv").config({ path: __dirname + "/.env" });
const GAS_THRESHOLD = keys.parsed.GAS_THRESHOLD;
const GAS_MULTIPLIER = parseFloat(keys.parsed.GAS_MULTIPLIER);
// Provider
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools/");
const gasPrice = provider.getGasPrice();
let date_ob = new Date();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

let timeNow = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
function gasChecker(gasPrice) {
  if (Number(formatUnits(gasPrice, "gwei")) < Number(GAS_THRESHOLD)) {
    return true;
  }
  return false;
}
async function checkGas() {
  // get the data for the tx
  const gasPrice = await provider.getGasPrice();
  if (gasChecker(gasPrice)) {
	console.log(timeNow + ";" + "%s".green + "; Good gas price!", formatUnits(gasPrice, "gwei"));
  } else {
    console.log(timeNow + ";" + "%s".red + "; Shitty gas price!", formatUnits(gasPrice, "gwei"));
  }
}
setInterval(checkGas, 10000);