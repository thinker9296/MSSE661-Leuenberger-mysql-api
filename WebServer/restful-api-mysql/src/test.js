// FIRST
// uncomment below and run "node src/test.js" from restful-api-mysql dir
// console.log(module);

//SECOND
// uncomment below and run "node src/test.js" from restful-api-mysql dir
//console.log(module.exports);

//THIRD
// uncomment below and run "node src/test.js" from restful-api-mysql dir
//module.exports = function (a,b) {
//    return a +b;
//};
//console.log(module.exports);

//FOURTH
// uncomment below and run "node src/test.js" from restful-api-mysql dir
exports.sum = function (a,b) {
    return a +b;
};

exports.subtract = function (a,b) {
    return a - b;
};

console.log(module);
//console.log(exports);