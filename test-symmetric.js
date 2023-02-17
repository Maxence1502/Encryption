const crypto = require('crypto');

require('dotenv').config();
const inputString = process.env.INPUT_STRING;
const key = process.env.KEY;

function encryptString(inputString, key) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(inputString, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + encrypted;
}

const encryptedString = encryptString(inputString, key);
console.log('Chaîne chiffrée :', encryptedString);

function decryptString(encryptedString, key) {
    const iv = encryptedString.slice(0, 32);
    const encrypted = encryptedString.slice(32);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

const decrypted = decryptString(encryptedString, key);
console.log('Chaîne déchiffrée :', decrypted);
