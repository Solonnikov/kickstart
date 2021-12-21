const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

// Sets build path
const buildPath = path.resolve(__dirname, "build");
// Cleans build folder
fs.removeSync(buildPath);

// Compiling and resolving the contracts
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// Create build folder
fs.ensureDirSync(buildPath);

// iterating output to resolve all contracts
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    )
}
