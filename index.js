const searchBar = $('#searchBar')
const searchStat = $('#search')
const resultList = $('#results')
const nomList = $('#nomination')
const nominations = []

searchBar.on('input', () => {
    searchStat.text(searchBar.val())
    const movie = searchBar.val()
    const query = "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy"

    resultList.empty()

    $.ajax({
        method: "GET",
        url: query
    }).then(data => {
        const movObj = data.Search
        if(movObj === undefined){
            console.log('No Search Obj')
        } else {
            for(var i = 0; i < 3; i++){
                const {Title} = movObj[i]
                const newMovie = $('<li>').text(Title)
                const nomButton = $('<button>').text('Nominate').addClass('nominateButton').attr('id',Title)

                resultList.append(newMovie).append(nomButton)
            }
        }
    })
})

resultList.on('click', '.nominateButton', e => {
    e.preventDefault()
    const title = e.target.id
    nominations.push(title)
    localStorage.setItem('Nominations', JSON.stringify(nominations))
    console.log(nominations)
})