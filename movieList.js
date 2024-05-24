//navigationBar
const logOut = document.getElementById('logOutBtn')
const createNewMoviePromoBtn = document.getElementById('createNewMovieBtn')
const creatorTab = document.getElementById('creatorForMoviesList')
//create new movie poster
const imageInput = document.getElementById('imageUrl')
const errorUrlMsg = document.querySelector('.errorUrlMsg')
const titleInput = document.getElementById('movieTitle')
const errorTitleMsg = document.querySelector('.errorTitleMsg')
const numberOfSeatsInput = document.getElementById('totalSeats')
const errorSeatsMsg = document.querySelector('.errorSeatsMsg')
const createMovieBtn = document.getElementById('createBtn')
//movieContainer
const movieContainer = document.getElementById('moviesContainer')
const singleMovieContainer = document.getElementById('detailsContainer')

let moviesList = []

export function displayMovies(){
    const storedMovies = localStorage.getItem('moviesList');
    if (storedMovies){
        moviesList = JSON.parse(storedMovies);
    }
    window.onload = () => {
        moviesList.forEach((movie)=>{
            const { title, imageUrl, totalSeats } = movie;
            const movieEl = createMovieElement(title, imageUrl, totalSeats);
            movieContainer.appendChild(movieEl);
            console.log(movie)
        })
        createNewMovie()
    }
}

//check user role
export function checkUserRole() {
    let userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        if (userInfo.role === 'admin') {
            console.log("Welcome admin:", userInfo.username)
            createNewMovieSession()
        } else {
            console.log("Welcome regular user:", userInfo.username)
            if (createNewMoviePromoBtn) {
                createNewMoviePromoBtn.classList.add('d-none')
                creatorTab.classList.add('d-none')
            }
        }
    } else {
        console.log("no user is currently logged in")
        // window.location.href = 'index.html'
    }
}
//additional function for check if user admin
function isAdminUser() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        return userInfo.role === 'admin';
    }
    return false
}
//log out
export function logOutFromSession() {
    logOut.onclick = () => {
        localStorage.removeItem('userInfo');
        window.location.href = 'index.html'
    }
}
//open movie creator window
function createNewMovieSession() {
    createNewMoviePromoBtn.onclick = () => {
        creatorTab.classList.toggle('d-none')
    }
}
//functions for validate all inputs
function checkTitle() {
    const title = titleInput.value.trim()
    if (title) {
        errorTitleMsg.textContent = ''
        return true
    } else {
        errorTitleMsg.textContent = 'Title cannot be empty'
        return false
    }
}
function checkValidUrl() {
    let checkUrl = /https?:\/\/.*\.(?:png|jpg|gif|jpeg|svg|webp|bmp)/i;
    if (checkUrl.test(imageInput.value)) {
        errorUrlMsg.textContent = 'valid url'
        return true
    } else {
        errorUrlMsg.textContent = 'invalid url'
        return false
    }
}
function checkSeatNumber() {
    const seats = parseInt(numberOfSeatsInput.value, 10)
    if (!isNaN(seats) && seats >= 1 && seats <= 30) {
        errorSeatsMsg.textContent = '1-30'
        return true
    } else {
        errorSeatsMsg.textContent = 'Seats must be between 0 and 30'
        return false
    }
}
export function checkInputs() {
    const isTitleValid = checkTitle()
    const isUrlValid = checkValidUrl()
    const isSeatsValid = checkSeatNumber()
    if (isTitleValid && isUrlValid && isSeatsValid) {
        createMovieBtn.classList.add('enabled')
        createMovieBtn.addEventListener('click', createNewMovie)
    } else {
        createMovieBtn.classList.remove('enabled')
        createMovieBtn.removeEventListener('click', createNewMovie)
    }
}
//generate individual id for created movie
function generateId() {
    return '' + Math.random().toString(36).substr(2, 9)
}
//first check if admin user so then I see a creator menu
function createNewMovie() {
    if (!createMovieBtn.classList.contains('enabled')) return;

    const title = titleInput.value.trim();
    const imageUrl = imageInput.value;
    const totalSeats = numberOfSeatsInput.value;

    const movieId = generateId();
    const movie = { id: movieId, title, imageUrl, totalSeats };

    moviesList.push(movie);
    localStorage.setItem('moviesList', JSON.stringify(moviesList));
    alert('Movie created successfully!');
    window.location.reload()
}
function createDeleteButton(title, imageUrl, totalSeats){
    const deleteBtnEl = document.createElement('div')
    deleteBtnEl.classList.add('button')
    deleteBtnEl.textContent = 'Delete'

    deleteBtnEl.addEventListener('click', function() {
        const movieEl = deleteBtnEl.parentElement
        movieEl.remove()

        const index = moviesList.findIndex(movie => movie.title === title && movie.imageUrl === imageUrl && movie.totalSeats === totalSeats)
        if (index !== -1) {
            moviesList.splice(index, 1)
            localStorage.setItem('moviesList', JSON.stringify(moviesList))
        }
    });

    return deleteBtnEl
}
function createMovieElement(title, imageUrl, totalSeats) {
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    const titleEl = document.createElement('div')
    titleEl.classList.add('title')
    titleEl.textContent = title

    const imageEl = document.createElement('div')
    imageEl.classList.add('movieImage')
    imageEl.style.backgroundImage = `url(${imageUrl})`

    const seatsEl = document.createElement('div')
    seatsEl.classList.add('seats')
    seatsEl.textContent = `Total seats: ${totalSeats}`

    if (isAdminUser()){
        const deleteBtnEl = createDeleteButton(title, imageUrl, totalSeats)
        movieEl.appendChild(deleteBtnEl)
    }

    movieEl.addEventListener('click', () => {
        movieContainer.classList.add('d-none')
        singleMovieContainer.classList.remove('d-none')

        const detailsTitleEl = document.createElement('div')
        detailsTitleEl.classList.add('detailTitle')
        detailsTitleEl.textContent = title

        const detailsImageEl = document.createElement('div')
        detailsImageEl.classList.add('detailImage')
        detailsTitleEl.style.backgroundImage = `url(${imageUrl})`

        const detailsSeatsEl = document.createElement('div')
        detailsSeatsEl.classList.add('detailSeats')
        for (let i=0; i<totalSeats; i++) {
            const seatDivEl = document.createElement('div')
            seatDivEl.classList.add('seat')
            seatDivEl.addEventListener('click', () => {
                seatDivEl.classList.toggle('reserved')
            })
            detailsSeatsEl.appendChild(seatDivEl)
        }

        const backBtn = document.createElement('div')
        backBtn.classList.add('button')
        backBtn.textContent = 'Back'

        const reserveBtn = document.createElement('div')
        reserveBtn.classList.add('button')
        reserveBtn.textContent = 'Reserve'

        singleMovieContainer.appendChild(detailsSeatsEl)
        singleMovieContainer.appendChild(detailsTitleEl)
        singleMovieContainer.appendChild(detailsImageEl)
        singleMovieContainer.appendChild(backBtn)
        singleMovieContainer.appendChild(reserveBtn)

        backBtn.addEventListener('click', () => {
            movieContainer.classList.remove('d-none')
            singleMovieContainer.classList.add('d-none')

            while (singleMovieContainer.firstChild){
                singleMovieContainer.removeChild(singleMovieContainer.firstChild)
            }
        })
    })

    movieEl.appendChild(titleEl)
    movieEl.appendChild(imageEl)
    movieEl.appendChild(seatsEl)

    return movieEl
}

titleInput.addEventListener('input', checkInputs)
imageInput.addEventListener('input', checkInputs)
numberOfSeatsInput.addEventListener('input', checkInputs)