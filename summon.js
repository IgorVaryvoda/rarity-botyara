const ethers = require("ethers");
const { parseUnits, formatUnits } = require("@ethersproject/units");
const fs = require('fs')
var colors = require("colors");

let keys = require("dotenv").config({ path: __dirname + "/.env" });
const PVT_KEY = keys.parsed.PVT_KEY;
const LOOT_MEMBERS = keys.parsed.LOOT_IDS.split(",").map(Number);
const GAS_THRESHOLD = keys.parsed.GAS_THRESHOLD;
const GAS_MULTIPLIER = parseFloat(keys.parsed.GAS_MULTIPLIER);
// Provider
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools/");
const wallet = new ethers.Wallet(PVT_KEY, provider);
const account = wallet.connect(provider);

const rarityAbi = require("./abis/rarity.json");
const attributesAbi = require("./abis/attributes.json");
const lootContract = new ethers.Contract(
  "0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb",
  rarityAbi,
  account
);
const attributesContract = new ethers.Contract(
  "0xb5f5af1087a8da62a23b08c00c6ec9af21f397a1",
  attributesAbi,
  account
);

function gasChecker(gasPrice) {
  if (Number(formatUnits(gasPrice, "gwei")) < Number(GAS_THRESHOLD)) {
    return true;
  }
  return false;
}
function hex_to_ascii(str1)
 {
  var hex  = str1.toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
 }
async function summon() {
  // get the data for the tx
  const gasPrice = await provider.getGasPrice();
  if (gasChecker(gasPrice)) {
    console.log(
      "Sending tx | GasNow = %s gwei -> Using = %s gwei".green,
      formatUnits(gasPrice, "gwei"),
      formatUnits(gasPrice, "gwei") * GAS_MULTIPLIER
    );
    const nonce = await provider.getTransactionCount(wallet.address);
    // construct the tx
    const tx = await lootContract.summon(5, {
      gasLimit: 210000,
      gasPrice: gasPrice * GAS_MULTIPLIER,
      nonce,
    });
    // Get tx details
    const receipt = await tx.wait();
    // Show tx on log
    console.log("Creating heroes", receipt);
  } else {
    console.log("Damm! Gas too high! [%s]".red, formatUnits(gasPrice, "gwei"));
  }
}

async function attributes(id) {
  // get the data for the tx
  const gasPrice = await provider.getGasPrice();
  if (gasChecker(gasPrice)) {
    console.log(
      "Sending tx | GasNow = %s gwei -> Using = %s gwei".green,
      formatUnits(gasPrice, "gwei"),
      formatUnits(gasPrice, "gwei") * GAS_MULTIPLIER
    );
    const nonce = await provider.getTransactionCount(wallet.address);
    // construct the tx
    const tx = await attributesContract.point_buy(id, 20, 8, 14, 8, 10, 8
, {
      gasLimit: 210000,
      gasPrice: gasPrice * GAS_MULTIPLIER,
      nonce,
    });
    // Get tx details
    const receipt = await tx.wait();
    // Show tx on log
    console.log("Assigning attributes", receipt);
  } else {
    console.log("Damm! Gas too high! [%s]".red, formatUnits(gasPrice, "gwei"));
  }
}


const startSummon = async () => {
  for (let count = 0; count <290; count++) {
    try {
    await summon();
    } catch (e) {
      console.log("Error Happened: %s".red.bold, e);
    }
  }
}
const assignAttributes = async () => {
  for (let i = 0; i < LOOT_MEMBERS.length; i++) {
    try {
    await attributes(LOOT_MEMBERS[i]);
    } catch (e) {
      console.log("Error Happened: %s".red.bold, e);
    }
  }
}
assignAttributes();