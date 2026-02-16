const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EcoCoin", function () {
  let ecoCoin;
  let owner;
  let user1;
  
  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
    const EcoCoin = await ethers.getContractFactory("EcoCoin");
    ecoCoin = await EcoCoin.deploy();
  });
  
  it("Should deploy with correct name and symbol", async function () {
    expect(await ecoCoin.name()).to.equal("EcoCoin");
    expect(await ecoCoin.symbol()).to.equal("ECO");
  });
  
  it("Should mint initial supply to owner", async function () {
    const balance = await ecoCoin.balanceOf(owner.address);
    expect(balance).to.be.gt(0);
  });
  
  it("Should allow owner to verify users", async function () {
    await ecoCoin.verifyUser(user1.address);
    expect(await ecoCoin.verifiedUsers(user1.address)).to.be.true;
  });
  
  it("Should reward verified users", async function () {
    await ecoCoin.verifyUser(user1.address);
    await ecoCoin.rewardUser(user1.address, ethers.parseEther("10"));
    const balance = await ecoCoin.balanceOf(user1.address);
    expect(balance).to.equal(ethers.parseEther("10"));
  });
});
