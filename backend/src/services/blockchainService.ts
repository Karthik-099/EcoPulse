import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY!, provider);

const contractABI = [
  'function mint(address to, uint256 amount) public',
  'function transfer(address to, uint256 amount) public returns (bool)',
  'function balanceOf(address account) public view returns (uint256)'
];

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS!,
  contractABI,
  wallet
);

export const rewardUser = async (userId: string, amount: number) => {
  try {
    const tx = await contract.mint(userId, ethers.parseEther(amount.toString()));
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error('Blockchain reward failed:', error);
    throw error;
  }
};

export const transferTokens = async (from: string, to: string, amount: number) => {
  try {
    const tx = await contract.transfer(to, ethers.parseEther(amount.toString()));
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error('Token transfer failed:', error);
    throw error;
  }
};

export const getBalance = async (address: string): Promise<number> => {
  try {
    const balance = await contract.balanceOf(address);
    return parseFloat(ethers.formatEther(balance));
  } catch (error) {
    console.error('Failed to get balance:', error);
    return 0;
  }
};
