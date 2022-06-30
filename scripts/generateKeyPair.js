const { Command } = require('commander');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const program = new Command();

const director = path.resolve(__dirname, '../keys');
if (!fs.existsSync(director)) {
  fs.mkdirSync(director);
}

const options = program
  .helpOption('-h, --help', 'help message')
  .option('-p, --passphrase <string>', 'provide a valid passphrase')
  .parse(process.argv)
  .opts();

const generateKeys = (_options) => {
  // The `generateKeyPairSync` method accepts two arguments:
  // 1. The type ok keys we want, which in this case is "rsa"
  // 2. An object with the properties of the key
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048, // 4096
    // namedCurve: 'secp256k1',
    publicKeyEncoding: {
      type: 'pkcs1', // spki
      format: 'pem',
    },
    privateKeyEncoding: {
      // first of a family of standards called Public-Key Cryptography Standards
      type: 'pkcs1', // pkcs8
      format: 'pem',
      // set of rules used to encode the information
      cipher: 'aes-256-cbc',
      // tell you how to arrange those rules
      passphrase: _options.passphrase || '',
    },
  });

  fs.writeFileSync(`${director}/private.pem`, privateKey);
  fs.writeFileSync(`${director}/public.pem`, publicKey);
  process.exit(0);
};

generateKeys(options);
