const searchBar = $('#searchBar')
const searchStat = $('#search')
const resultList = $('#results')
const nomList = $('#nomination')

searchBar.on('input', () => {
    searchStat.text(searchBar.val())
    const movie = searchBar.val()
    const query = "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy"

    $.ajax({
        method: "GET",
        url: query
    }).then(data => {
        if(data.Search === undefined){
            console.log('No Search Obj')
        } else {
            for(var i = 0; i < 3; i++){
                console.log(data.Search[i])
            }
        }
    })
})

