const hre = require("hardhat");

async function main() {
  console.log("Deploying EcoCoin contract...");
  
  const EcoCoin = await hre.ethers.getContractFactory("EcoCoin");
  const ecoCoin = await EcoCoin.deploy();
  
  await ecoCoin.waitForDeployment();
  
  const address = await ecoCoin.getAddress();
  console.log(`EcoCoin deployed to: ${address}`);
  console.log(`Update CONTRACT_ADDRESS in .env with: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
