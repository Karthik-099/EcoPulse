// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract EcoCoin is ERC20, Ownable, Pausable {
    mapping(address => uint256) public carbonCredits;
    mapping(address => bool) public verifiedUsers;
    
    event UserVerified(address indexed user);
    event CarbonCreditPurchased(address indexed company, uint256 amount);
    event RewardDistributed(address indexed user, uint256 amount);
    
    constructor() ERC20("EcoCoin", "ECO") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    function rewardUser(address user, uint256 amount) public onlyOwner whenNotPaused {
        require(verifiedUsers[user], "User not verified");
        _mint(user, amount);
        emit RewardDistributed(user, amount);
    }
    
    function verifyUser(address user) public onlyOwner {
        verifiedUsers[user] = true;
        emit UserVerified(user);
    }
    
    function purchaseCarbonCredit(uint256 amount) public payable {
        require(msg.value > 0, "Payment required");
        carbonCredits[msg.sender] += amount;
        emit CarbonCreditPurchased(msg.sender, amount);
    }
    
    function getCarbonCredits(address company) public view returns (uint256) {
        return carbonCredits[company];
    }
    
    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
    
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
