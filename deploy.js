const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const output = require('./compile');

const InboxContract = output.contracts['Inbox.sol:Inbox'];
const LotteryContract = output.contracts['Lottery.sol:Lottery'];

const mnemonic = 'risk turtle power frost all energy quick old actor cruise circle chimney';
const gate = 'https://rinkeby.infura.io/CZQy06UX0W4eaySfAcuP';

const provider = new HDWalletProvider(mnemonic, gate);
// const web3 = new Web3(provider);
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const deploy = async (contract, contractArg) => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  let result;
  try {
  result = await new web3.eth.Contract(JSON.parse(contract.interface))
    .deploy({ data: "0x"+contract.bytecode, arguments: contractArg})
    // .deploy({ data: "0x"+InboxContract.bytecode })
    .send({ gas: 1500000, from: accounts[0]}); 
  }
  catch(err) {
    console.log(err);
  }

  console.log('Contract deployed to', result.options.address);
}
deploy(InboxContract, ['Hi there!']);
deploy(LotteryContract);