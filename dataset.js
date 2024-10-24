const data = [
    { "Firstname": "Julien", "Lastname": "Tassin", Fullname: "Julien Tassin" },

    // { "Firstname": "Zzerard", "Lastname": "Mensoif", Fullname: "Zzerard Mensoif" },
    // { "Firstname": "Zzrrard", "Lastname": "Mensoif", Fullname: "Zzrrard Mensoif" },
]

module.exports = { 
    data: data.map((dev, index) => ({ ...dev, id: index }))
}