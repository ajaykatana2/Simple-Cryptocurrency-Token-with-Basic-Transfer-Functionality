// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
const hre = require("hardhat");

async function main() {
  // Token parameters
  const name = "Simple Token";
  const symbol = "STK";
  const decimals = 18;
  const initialSupply = 1000000; // 1 million tokens

  console.log(`Deploying SimpleToken with the following parameters:`);
  console.log(`- Name: ${name}`);
  console.log(`- Symbol: ${symbol}`);
  console.log(`- Decimals: ${decimals}`);
  console.log(`- Initial Supply: ${initialSupply}`);

  // Get the contract factory
  const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
  
  // Deploy the contract
  const simpleToken = await SimpleToken.deploy(name, symbol, decimals, initialSupply);

  // Wait for the contract to be deployed
  await simpleToken.deployed();

  console.log(`SimpleToken deployed to: ${simpleToken.address}`);
  console.log(`Total supply: ${await simpleToken.totalSupply()} (${initialSupply} * 10^${decimals})`);
  
  // Log deployment information for verification
  console.log("\nVerification command:");
  console.log(`npx hardhat verify --network ${hre.network.name} ${simpleToken.address} "${name}" "${symbol}" ${decimals} ${initialSupply}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});