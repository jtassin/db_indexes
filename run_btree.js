const { data } = require('./dataset');
const fs = require('fs');
const { buildBTree } = require('./btree');  
const { findAllBtreeValues } = require('./searchers');

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }
  

function run() {
    

    const balancedTree = buildBTree({ array: data, field: 'Fullname' });

    fs.writeFileSync('./btree.json', JSON.stringify(balancedTree, null, 2));

    console.log('Balanced tree has been written to btree.json');

    // console.log('rappel log 1.35', data.length, getBaseLog(1.35, data.length))

    findAllBtreeValues({ fullname: "Yukan Zhao", tree: balancedTree, data });

}

run();