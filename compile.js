const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const inboxSource = fs.readFileSync(inboxPath, 'utf8');
const lotterySource = fs.readFileSync(lotteryPath, 'utf8');

var input = {
	'Inbox.sol': inboxSource,
	'Lottery.sol': lotterySource
}
var output = solc.compile({ sources: input }, 1);

for (var contractName in output.contracts)
  console.log(contractName + ': ' + output.contracts[contractName].interface)
  
// module.exports = compiler;
module.exports = output;