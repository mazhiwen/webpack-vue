const path = require('path');

const isAbsoluteUrl = require('is-absolute-url');

console.log(Array.isArray(path.resolve(__dirname, './dist')));
console.log(isAbsoluteUrl(String(path.resolve(__dirname, '../dist'))));