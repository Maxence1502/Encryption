const readline = require('readline');
const fs = require('fs');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Default key file paths
const publicKeyPath = './public.pem';
const privateKeyPath = './private.pem';

// Function to encrypt a message using a public key
function encryptMessage(message, publicKey) {
  const buffer = Buffer.from(message);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
}

// Function to decrypt a message using a private key
function decryptMessage(encryptedMessage, privateKey) {
  const buffer = Buffer.from(encryptedMessage, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString();
}

// Read the public key from a file
function getPublicKey(path) {
  const publicKey = fs.readFileSync(path, 'utf8');
  return publicKey;
}

// Read the private key from a file
function getPrivateKey(path) {
  const privateKey = fs.readFileSync(path, 'utf8');
  return privateKey;
}

// Ask the user whether to encrypt or decrypt
rl.question('Do you want to encrypt or decrypt? (e/d): ', (answer) => {
  if (answer === 'e') {
    // Ask the user for the message and public key
    rl.question('Enter the message to encrypt: ', (message) => {
      rl.question('Enter the path to the public key file (or leave blank for default): ', (publicKeyAnswer) => {
        const publicKeyPath = publicKeyAnswer || './public.pem';
        const publicKey = getPublicKey(publicKeyPath);
        const encryptedMessage = encryptMessage(message, publicKey);
        console.log('Encrypted message:', encryptedMessage);
        rl.close();
      });
    });
  } else if (answer === 'd') {
    // Ask the user for the encrypted message and private key
    rl.question('Enter the message to decrypt: ', (encryptedMessage) => {
      rl.question('Enter the path to the private key file (or leave blank for default): ', (privateKeyAnswer) => {
        const privateKeyPath = privateKeyAnswer || './private.pem';
        const privateKey = getPrivateKey(privateKeyPath);
        const decryptedMessage = decryptMessage(encryptedMessage, privateKey);
        console.log('Decrypted message:', decryptedMessage);
        rl.close();
      });
    });
  } else {
    console.log('Invalid choice. Please enter "e" or "d".');
    rl.close();
  }
});