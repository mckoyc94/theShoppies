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
        if(movObj !== undefined){
            for(var i = 0; i < 3; i++){
                const {Title, Year} = movObj[i]
                const newMovie = $('<li>').text(`${Title} (${Year})`)
                const nomButton = $('<button>').text('Nominate').addClass('nominateButton').addClass('ml-2').attr('id',`${Title} (${Year})`)
                const currentNom = nominations.filter( movie => movie === `${Title} (${Year})`)

                if(currentNom.length === 1){
                    nomButton.prop('disabled', true)
                }

                newMovie.append(nomButton)
                resultList.append(newMovie)

            }
        }
    })
})

resultList.on('click', '.nominateButton', e => {
    e.preventDefault()
    const title = e.target.id
    if(nominations.length === 4){
        const banner = $('<div>').addClass('banner')
        const banTitle = $('<h1>').text('Your 5 Nominations!')
        const banSubTitle = $('<h3>').text("Thank you for your nominations")
        const finalNomList = $('<ul>')
        const image = $('<img>').attr('src', "https://ae01.alicdn.com/kf/HTB1K1IkPFXXXXaJXFXXq6xXFXXX7/The-Oscar-Academy-Awards-Trophy-Oscar-trophy-replica-Academy-Award-Oscar-Statue-Oscar-Trophy.jpg_Q90.jpg_.webp").attr('id', "trophy")
        $('main').empty()

        nominations.push(title)
        localStorage.setItem('Nominations', JSON.stringify(nominations))
        
        banner.append(banTitle).append(banSubTitle).append(finalNomList).prepend(image)
        nominations.map(movie => {
            const newNom = $('<li>').text(movie)
            finalNomList.append(newNom)
        })

        $("body").prepend(banner)

    } else if (nominations.length === 5){
        const banner = $('<div>').addClass('banner')
        const banTitle = $('<h1>').text('Your 5 Nominations!')
        const banSubTitle = $('<h3>').text("Thank you for your nominations")
        const finalNomList = $('<ul>')
        const image = $('<img>').attr('src', "https://ae01.alicdn.com/kf/HTB1K1IkPFXXXXaJXFXXq6xXFXXX7/The-Oscar-Academy-Awards-Trophy-Oscar-trophy-replica-Academy-Award-Oscar-Statue-Oscar-Trophy.jpg_Q90.jpg_.webp").attr('id', "trophy")
        $('main').empty()
        
        banner.append(banTitle).append(banSubTitle).append(finalNomList).prepend(image)
        nominations.map(movie => {
            const newNom = $('<li>').text(movie)
            finalNomList.append(newNom)
        })

        $("body").prepend(banner)
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
            const removeButton = $('<button>').text('Remove').addClass('removeButton').addClass('ml-2').attr('id', noms)
            
            nominatedList.append(removeButton)
            nomList.append(nominatedList)
        })
    }
}

loadNoms()