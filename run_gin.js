const { data } = require('./dataset');
const fs = require('fs');
const { buildGin } = require('./gin');  
const { findAllBtreeValues } = require('./searchers');


function run() {
    const ginIndex = buildGin({ array: data, field: 'Fullname' });

    fs.writeFileSync('./gin.json', JSON.stringify(ginIndex, null, 2));

    console.log('Gin Index has been written to gin.json');

    findAllBtreeValues({ fullname: "Benoit", tree: ginIndex, data });

}

run();