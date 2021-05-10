// Parts of DOM consts
const searchBar = $('#searchBar')
const searchStat = $('#search')
const resultList = $('#results')
const nomList = $('#nomination')
// Global Variable to Save Nominations In
let nominations = []

// Search Bar updates page on input
searchBar.on('input', () => {
    // Take the value from the search bar and loads in Results Header
    searchStat.text(searchBar.val())
    // Takes the Search Bar Value to create API Query Link
    const movie = searchBar.val()
    const query = "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy"

    // Emptys Results to input new Results
    resultList.empty()

    // Ajax Call to OMDB API
    $.ajax({
        method: "GET",
        url: query
    }).then(data => {
        // Takes Data from Search
        const movObj = data.Search
        // If current search yeilds results, populate Results Table
        if(movObj !== undefined){
            // Only Takes the first 3 results
            for(var i = 0; i < 3; i++){
                // Destructure Current Movie to just Title and Year
                const {Title, Year} = movObj[i]
                // Creates Movie List Item
                const newMovie = $('<li>').text(`${Title} (${Year})`)
                // Creates Nomination Button
                const nomButton = $('<button>').text('Nominate').addClass('nominateButton').addClass('ml-2').attr('id',`${Title} (${Year})`)
                // Checks if Movie has already been nominated
                const currentNom = nominations.filter( movie => movie === `${Title} (${Year})`)

                // If movie has been nominated, Disables Button
                if(currentNom.length === 1){
                    nomButton.prop('disabled', true)
                }
                // Links Nomination Button to List Item
                newMovie.append(nomButton)
                // Adds List Item to Page
                resultList.append(newMovie)

            }
        }
    })
})

// Nomination Buttons adds Movie to Nomination List
resultList.on('click', '.nominateButton', e => {
    e.preventDefault()
    // Target Movie
    const title = e.target.id
    // Checks if 4 movies have already been added and loads end banner after adding movie
    if(nominations.length === 4){
        // Creates new DOM items
        const banner = $('<div>').addClass('banner')
        const banTitle = $('<h1>').text('Your 5 Nominations!')
        const banSubTitle = $('<h3>').text("Thank you for your nominations")
        const finalNomList = $('<ul>')
        const image = $('<img>').attr('src', "https://ae01.alicdn.com/kf/HTB1K1IkPFXXXXaJXFXXq6xXFXXX7/The-Oscar-Academy-Awards-Trophy-Oscar-trophy-replica-Academy-Award-Oscar-Statue-Oscar-Trophy.jpg_Q90.jpg_.webp").attr('id', "trophy")
        // Clears Page for Banner
        $('main').empty()

        // Adds New Movie to Nominations
        nominations.push(title)
        // Saves Movie to Local Storage
        localStorage.setItem('Nominations', JSON.stringify(nominations))
        
        // Creates Banner fully
        banner.append(banTitle).append(banSubTitle).append(finalNomList).prepend(image)
        // Loads Winning Movies on Banner
        nominations.map(movie => {
            const newNom = $('<li>').text(movie)
            finalNomList.append(newNom)
        })

        // Adds Banner to Page
        $("body").prepend(banner)
    
    // If User Returns to Page, Checks that they Already Chose 5 movies 
    } else if (nominations.length === 5){
        // Creates new DOM items
        const banner = $('<div>').addClass('banner')
        const banTitle = $('<h1>').text('Your 5 Nominations!')
        const banSubTitle = $('<h3>').text("Thank you for your nominations")
        const finalNomList = $('<ul>')
        const image = $('<img>').attr('src', "https://ae01.alicdn.com/kf/HTB1K1IkPFXXXXaJXFXXq6xXFXXX7/The-Oscar-Academy-Awards-Trophy-Oscar-trophy-replica-Academy-Award-Oscar-Statue-Oscar-Trophy.jpg_Q90.jpg_.webp").attr('id', "trophy")
        // Clears Page for Banner
        $('main').empty()
        
        // Creates Banner fully
        banner.append(banTitle).append(banSubTitle).append(finalNomList).prepend(image)
        // Loads Winning Movies on Banner
        nominations.map(movie => {
            const newNom = $('<li>').text(movie)
            finalNomList.append(newNom)
        })
        // Adds Banner to Page
        $("body").prepend(banner)

    // If under 4 nominations, adds new Nomination
    } else {
        // Adds Title to Nominations
        nominations.push(title)
        // Saves to Local Storage
        localStorage.setItem('Nominations', JSON.stringify(nominations))
        // Loads Movies in Nominations Section
        loadNoms()
    }
})

// Removes Nomination from List
nomList.on('click', '.removeButton', e => {
    e.preventDefault()
    // Target Movie
    const title = e.target.id
    // Filters through Nominations and returns other movies
    let updateNom = nominations.filter(movie => movie !== title)
    // Sends Nominations to Local Storage
    localStorage.setItem('Nominations', JSON.stringify(updateNom))
    // Loads Movies in Nomination Section
    loadNoms()
})

// Loads Current Nominations
const loadNoms = () => {
    // Clears List of Old Nominations
    nomList.empty()
    // Retrieves Data from Local Storage and Checks for Current Nominations 
    if(localStorage.getItem('Nominations') !== null ){
        // Take Info and Places it in Global Variable
        nominations = JSON.parse(localStorage.getItem('Nominations'))

        // Maps through all Nominations and Adds Movie to Page
        nominations.map(noms => {
            // Creates DOM Items
            const nominatedList = $('<li>').text(noms)
            const removeButton = $('<button>').text('Remove').addClass('removeButton').addClass('ml-2').attr('id', noms)
            
            // Adds Remove Button to Movie List Item
            nominatedList.append(removeButton)
            // Adds List Item to Nomination Section
            nomList.append(nominatedList)
        })
    }
}

// Loads Movies in Nomination Section on Page Load
loadNoms()