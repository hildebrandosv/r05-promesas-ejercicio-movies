const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const h2 = document.querySelector('h2')

h2.addEventListener('click', () => {
    getMovies(API_URL)
})

const getMovies = (url) => {
    const peticion = fetch(url)
    peticion.then(resp => resp.json())
        .then(data => showMovies(data.results))
        .catch(error =>
            swal.fire({
                title: 'Hubo un error con el servidor',
                text: 'Intente de nuevo más tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }))
}

// const getMovies2 = async (url) => {
//     const resp = await fetch(url)
//     const data = await resp.json()
//     console.log(data.results);
// }

getMovies(API_URL)

const showMovies = (movies) => {
    console.log(movies);
    if (movies.length == 0) {
        swal.fire({
            title: 'Pelicula no encontrada',
            text: 'Intenta con otro nombre',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    } else {
        main.innerHTML = ''
        movies.forEach(movie => {
            const { title, poster_path, vote_average, overview } = movie

            const divMovie = document.createElement('div')
            divMovie.classList.add('movie')
            divMovie.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class=${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
            main.appendChild(divMovie)
        })
    }
}

const getClassByRate = (rate) => {
    if (rate < 4) {
        return "red"
    } else if (rate > 6) {
        return "green"
    } else {
        return "orange"
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)
        search.value = ""
    } else {
        window.location.reload()
    }
})