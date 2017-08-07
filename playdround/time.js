// Jan 1st 1970 00:00:00 am

const moment = require('moment');

// let date = new Date();
// let months = [];
// console.log(date.getMonth());

new Date().getTime();
let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let areateAt = 1234;
var date = moment(areateAt);
// date.add(100, 'years').subtract(9, 'months');
console.log(date.format('DD MMM YYYY - k:mm'));
