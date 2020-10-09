// IMPORT FUNCTIONS FROM MODES FOLDER
const encrypt = require('./modes/enc');
const decrypt = require('./modes/dec');

// PULL THE MODE, FILE AND PASSWORD FROM THE ARGUMENTS IN TERMINAL
const [ mode, file, password ] = process.argv.slice(2);
if (mode === 'encrypt') {
  encrypt({ file, password });
}

if (mode === 'decrypt') {
  decrypt({ file, password });
}


