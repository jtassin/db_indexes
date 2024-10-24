const { buildBTree } = require("./btree");

function tokenize(fullname) {
    return fullname.split(' ')
}

function buildGin({ array, field }) {
    const tokens = array.reduce((acc, item) => {
        acc.push(...tokenize(item[field]).map(token => {
            return {
                token,
                id: item.id
            }

        }));
        return acc;
    }, [])
    return buildBTree({ array: tokens, field: 'token' });
}

module.exports = {
    buildGin
}