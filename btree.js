const { findAllBtree } = require('./searchers');

function splitIntoChunks(array, chunkCount) {
    const chunks = [];
    const chunkSize = Math.ceil(array.length / chunkCount);
    for (let i = 0; i < chunkCount; i++) {
        chunks.push(array.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return chunks;
}

function buildBTree({ array, field }) {
    const sortedArray = array.sort((a, b) => a[field] > b[field] ? 1 : -1);
    console.log(sortedArray)

    return buildBTreeInner({ array: sortedArray, field, index: [] })
}

function buildBTreeInner({ array, field, index }) {
    let orphans = array;
    if (orphans.length < 5) {
        return orphans.reduce((acc, dev) => {
            const exists = acc.find(branch => branch.start === dev[field] && branch.end === dev[field])

            if(exists) {
                exists.values.push(dev.id)
                return acc;
            }
            acc.push({
                start: dev[field],
                end: dev[field],
                values: [dev.id]
            })
            return acc;
        }, [])
    }
    const devChunks = splitIntoChunks(orphans, 5);
    const result = devChunks.reduce((acc, chunk) => {
        // if(chunk.length === 1) {
        //     console.log('chunk', orphans, chunk)
        // }
        if(chunk[0]) {
            acc.push({
                start: chunk[0][field],
                end: chunk[chunk.length - 1][field],
                values: buildBTreeInner({ array: chunk, field, index: acc })
            });
        }
        
        return acc;
    }, [])

    return result;
}

module.exports = { 
    buildBTree
}