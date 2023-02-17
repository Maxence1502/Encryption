const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

function encryptMessage(message, publicKey) {
    const buffer = Buffer.from(message);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);

    return encrypted.toString('base64');
}

function decryptMessage(encryptedMessage, privateKey) {
    const buffer = Buffer.from(encryptedMessage, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);

    return decrypted.toString();
}

/*const encryptedMessage = '...'; // the encrypted message sent by your neighbor
const decryptedMessage = decryptMessage(encryptedMessage, privateKey);
console.log(decryptedMessage); // prints the decrypted message*/

const encrypted = encryptMessage('Hello, world!', publicKey);
console.log('Encrypted message:', encrypted);

const decrypted = decryptMessage(encrypted, privateKey);
console.log('Decrypted message:', decrypted);
