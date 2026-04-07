const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// gives the current data and time 
console.log(format(new Date(), 'dd-MM-yyyy\tHH:mm:ss'));

console.log('hello save the file');

// uuid -> universally unique identifier
// used to generate random id's
console.log(uuid());

console.log();