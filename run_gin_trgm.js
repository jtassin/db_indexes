const { data } = require('./dataset');
const fs = require('fs');
const { buildGinTrgm } = require('./gin_trgm');  
const { findAllBtreeValues } = require('./searchers');


function run() {
    const ginIndex = buildGinTrgm({ array: data, field: 'Fullname' });

    fs.writeFileSync('./gin_trgm.json', JSON.stringify(ginIndex, null, 2));

    console.log('Gin Trgm Index has been written to gin_trgm.json');

    findAllBtreeValues({ fullname: "Ben", tree: ginIndex, data });
}

run();