function findAllfullScan({ fullname, data }) {

    let complexity = 0;
    let found = []
    for (let i = 0; i < data.length; i++) {
        complexity += 1;
        if (fullname === data[i].Fullname) {
            found.push(data[i]);
        }
    }
    console.log('findAllfullScan finished', {complexity, found})
}

function findAllBtreeInner({ fullname, tree = balancedTree, data }) {
    let complexity = 0;
    let found = []
    tree.find((branch) => {
        if(branch.start === fullname && branch.end === fullname && !branch.values[0].start) {
            complexity += 1
            found.push(...branch.values.map(idx => ({leaf: branch, value: data[idx]})))
            return;
        }
        if(branch.start <= fullname & branch.end >= fullname) {
            const { complexity: subComplexity, found: subFound } = findAllBtreeInner({ fullname, tree: branch.values, data });
            complexity += 1 + subComplexity;
            found.push(...subFound)
        }
        complexity += 1
    })
    return {complexity, found };
}

function findAllBtree({ fullname, tree = balancedTree, data }) {
    const { found } = findAllBtreeInner({ fullname, tree, data });

    return { found }
}

function findAllBtreeValues({ fullname, tree = balancedTree, data }) {
    const { complexity, found } = findAllBtreeInner({ fullname, tree, data });

    console.log('findAllBtree finished', {complexity, found: found.map(f => f.value)})

}


module.exports = {
    findAllfullScan,
    findAllBtree,
    findAllBtreeValues
}