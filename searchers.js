function generateTrigrams(str) {
    const trigrams = [];
    const paddedStr = `  ${str}  `; // Ajouter des espaces au début et à la fin pour les trigrammes de début et de fin

    for (let i = 0; i < paddedStr.length - 2; i++) {
        trigrams.push(paddedStr.slice(i, i + 3));
    }
    return trigrams;
}

function findAllfullScan({ fullname, data }) {

    let complexity = 0;
    let found = []
    for (let i = 0; i < data.length; i++) {
        complexity += 1;
        if (fullname === data[i].Fullname) {
            found.push(data[i]);
        }
    }
    console.log('findAllfullScan finished', { complexity, found })
}

function findAllBtreeInner({ fullname, tree = balancedTree, data }) {
    let complexity = 0;
    let found = []
    tree.find((branch) => {
        if (branch.start === fullname && branch.end === fullname && !branch.values[0].start) {
            complexity += 1
            found.push(...branch.values.map(idx => ({ leaf: branch, value: data[idx] })))
            return;
        }
        if (branch.start <= fullname & branch.end >= fullname) {
            const { complexity: subComplexity, found: subFound } = findAllBtreeInner({ fullname, tree: branch.values, data });
            complexity += 1 + subComplexity;
            found.push(...subFound)
        }
        complexity += 1
    })
    return { complexity, found };
}

function findAllBtree({ fullname, tree = balancedTree, data }) {
    const { found } = findAllBtreeInner({ fullname, tree, data });

    return { found }
}

function findAllBtreeValues({ fullname, tree = balancedTree, data }) {
    const { complexity, found } = findAllBtreeInner({ fullname, tree, data });

    console.log('findAllBtree finished', { complexity, found: found.map(f => f.value) })

}

function findAllTrigramSearch({ fullname, data, tree, minScore = 25 }) {
    const trigrams = generateTrigrams(fullname);
    let totalComplexity = 0;
    const result = {}
    for (let trigram of trigrams) {
        const { complexity, found } = findAllBtreeInner({ fullname: trigram, tree, data });
        found.forEach((item) => {
            totalComplexity += complexity;
            result[item.value.id] = result[item.value.id] ?? 0;
            result[item.value.id] += 1;
        })

    }
    const scoredResult = Object.entries(result).filter(([value, count]) => (100 * count / trigrams.length > minScore)).map(([value, count]) => ({
        dev: JSON.stringify(data[value]),
        score: Math.min(Math.round(100 * count / trigrams.length), 100)
    }))
    console.log('findAllTrigramSearch finished', { totalComplexity, scoredResult })
}


module.exports = {
    findAllfullScan,
    findAllBtree,
    findAllBtreeValues,
    findAllTrigramSearch
}