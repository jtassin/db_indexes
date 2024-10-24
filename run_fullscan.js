const { findAllfullScan } = require('./searchers.js');
const { data } = require('./dataset');

function run() {
    findAllfullScan({ fullname: "Yukan Zhao", data });
}

run()