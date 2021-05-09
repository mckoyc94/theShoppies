const searchBar = $('#searchBar')
const searchStat = $('#search')
const resultList = $('#results')
const nomList = $('#nomination')
let nominations = []

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
    console.log(nominations)
    if(nominations.length < 5){
        const title = e.target.id
        nominations.push(title)
        localStorage.setItem('Nominations', JSON.stringify(nominations))
        loadNoms()
    }else {
        alert("You've already nominated your 5 movies")
    }
})

const loadNoms = () => {
    nomList.empty()
    if(localStorage.getItem('Nominations') !== null ){
        nominations = JSON.parse(localStorage.getItem('Nominations'))

        nominations.map(noms => {
            const nominatedList = $('<li>').text(noms)
            const removeButton = $('<button>').text('Remove').addClass('removeButton').attr('id', noms)

            nomList.append(nominatedList).append(removeButton)
        })
    }
}

loadNoms()