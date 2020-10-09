const fs = require('fs');

const crypto = require('crypto');
const zlib = require('zlib');

const getCipherKey = require('../functions/getCipherKey');

function decrypt({ file, password }) {
    // First, get the initialization vector from the file.
    const readInitVect = fs.createReadStream(file, { end: 15 });

    // Wait to get the initVect.
    let initVect;
    readInitVect.on('data', (chunk) => {
      initVect = chunk;
    });
  
    // Once we’ve got the initialization vector, we can decrypt the file.
    readInitVect.on('close', () => {
      const CIPHER_KEY  = getCipherKey(password);
      const readStream = fs.createReadStream(file, { start: 16 });
      const decipher = crypto.createDecipheriv('aes256', CIPHER_KEY , initVect);
      const unzip = zlib.createUnzip();
      const writeStream = fs.createWriteStream(file + '.unenc');
  
      readStream
        .pipe(decipher)
        .pipe(unzip)
        .pipe(writeStream);
    });
  }

  module.exports = decrypt;