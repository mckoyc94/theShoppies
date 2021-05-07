const searchBar = $('#searchBar')
const searchStat = $('#search')
const resultList = $('#results')
const nomList = $('#nomination')

searchBar.on('input', () => {
    searchStat.text(searchBar.val())
})

