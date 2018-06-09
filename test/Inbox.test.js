const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const output = require('../compile');
const provider = ganache.provider();
const web3 = new Web3(provider);

const InboxContract = output.contracts['Inbox.sol:Inbox'];

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use account[0] to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(InboxContract.interface))
    .deploy({ data: InboxContract.bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })

  inbox.setProvider(provider);
})

describe('Inbox Contract', () => {
  it('Deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('Has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('Can change the message', async () => {
    await inbox.methods.setMessage('Bye now!').send({from: accounts[0]});
    const newMessage = await inbox.methods.message().call();
    assert.equal(newMessage, 'Bye now!');
  })
})

/*                  ~~~ MOCHA ~~~
 *
 * IT => Run a test and make an assertion ***********
 * DESCRIBE => Groups together some IT functions ****
 * ASSERT => Returns true if two inputs are equal ***
 * BEFOREEACH => Execute some general setup code ****
 */

