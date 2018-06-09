const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const output = require('../compile');
const provider = ganache.provider();
const web3 = new Web3(provider);

const LotteryContract = output.contracts['Lottery.sol:Lottery'];

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(LotteryContract.interface))
    .deploy({ data: LotteryContract.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  })
});