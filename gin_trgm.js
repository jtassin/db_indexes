const { buildBTree } = require("./btree");

function tokenize(fullname) {
    return fullname.split(' ')
}

function generateTrigrams(str) {
    const trigrams = [];
    const paddedStr = `  ${str}  `; // Ajouter des espaces au début et à la fin pour les trigrammes de début et de fin

    for (let i = 0; i < paddedStr.length - 2; i++) {
        trigrams.push(paddedStr.slice(i, i + 3));
    }

    return trigrams;
}

function buildGinTrgm({ array, field }) {
    const tokens = array.reduce((acc, item) => {
        acc.push(...tokenize(item[field]).flatMap(token => {
            return generateTrigrams(token).map(trigram => ({
                trigram,
                id: item.id
            }))
        }));
        return acc;
    }, [])
    return buildBTree({ array: tokens, field: 'trigram' });
}

module.exports = {
    buildGinTrgm
}