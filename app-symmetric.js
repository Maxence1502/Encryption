const crypto = require('crypto');
const readline = require('readline');
const { program } = require('commander');

program
  .option('-c, --command <command>', 'Command: encrypt or decrypt')
  .option('-k, --key <key>', 'Encryption key')
  .option('-s, --string <string>', 'String to encrypt/decrypt')
  .option('-v, --iv <iv>', 'Initialization vector')
  .parse(process.argv);

const { command, key, string, iv } = program;

if (!command || !key || !string || !iv) {
    console.error('Missing required arguments. See usage below:');
    program.help();
}

if (command !== 'encrypt' && command !== 'decrypt') {
    console.error('Invalid command. Must be "encrypt" or "decrypt".');
    program.help();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`Confirm ${command} with key "${key}" and IV "${iv}" for string "${string}"? (y/n) `, (answer) => {
    if (answer !== 'y') {
        console.log('Operation cancelled.');
        rl.close();
        return;
    }

    const keyBuffer = Buffer.from(key, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');

    let result;
    if (command === 'encrypt') {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(string, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        result = encrypted;
    } else {
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

        let decrypted = decipher.update(string, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        result = decrypted;
    }

    console.log('Result:', result);
    rl.close();
});
