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
                const {Title, Year} = movObj[i]
                const newMovie = $('<li>').text(`${Title} (${Year})`)
                const nomButton = $('<button>').text('Nominate').addClass('nominateButton').attr('id',Title)

                resultList.append(newMovie).append(nomButton)
            }
        }
    })
})

resultList.on('click', '.nominateButton', e => {
    e.preventDefault()
    const title = e.target.id
    if(nominations.length === 4){
        const banner = $('<div>')
        const banTitle = $('<h1>').text('Your 5 Nominations!')
        const banSubTitle = $('<h3>').text("Thank you for your nominations")
        const finalNomList = $('<ul>')
        
        nominations.push(title)
        localStorage.setItem('Nominations', JSON.stringify(nominations))
        
        banner.append(banTitle).append(banSubTitle).append(finalNomList)
        nominations.map(movie => {
            const newNom = $('<li>').text(movie)
            finalNomList.append(newNom)
        })

        $("body").append(banner)

    } else if (nominations.length === 5){
        alert("You've already entered your 5 movies")
    } else {
        nominations.push(title)
        localStorage.setItem('Nominations', JSON.stringify(nominations))
        loadNoms()
    }
})

nomList.on('click', '.removeButton', e => {
    e.preventDefault()
    const title = e.target.id
    let updateNom = nominations.filter(movie => movie !== title)
    localStorage.setItem('Nominations', JSON.stringify(updateNom))
    loadNoms()
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