//navigationBar
const logOut = document.getElementById('logOutBtn');
const createNewMoviePromoBtn = document.getElementById('createNewMovieBtn');
const creatorTab = document.getElementById('creatorForMoviesList');
//create new movie poster
const imageInput = document.getElementById('imageUrl');
const errorUrlMsg = document.querySelector('.errorUrlMsg');
const titleInput = document.getElementById('movieTitle');
const errorTitleMsg = document.querySelector('.errorTitleMsg');
const numberOfSeatsInput = document.getElementById('totalSeats');
const errorSeatsMsg = document.querySelector('.errorSeatsMsg');
const createMovieBtn = document.getElementById('createBtn');
//check user role
export function checkUserRole(){
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
//log out
export function logOutFromSession(){
    logOut.onclick = () => {
        localStorage.removeItem('userInfo');
        window.location.href = 'index.html'
    }
}
//open movie creator window
function createNewMovieSession(){
    createNewMoviePromoBtn.onclick = () => {
        creatorTab.classList.toggle('d-none')
    }
}

//functions for validate all inputs
function checkTitle(){
    const title = titleInput.value.trim()
    if (title){
        errorTitleMsg.textContent = ''
        return true
    } else {
        errorTitleMsg.textContent = 'Title cannot be empty'
        return false
    }
}
function checkValidUrl(){
    let checkUrl = /https?:\/\/.*\.(?:png|jpg|gif|jpeg|svg|webp|bmp)/i;
    if (checkUrl.test(imageInput.value)) {
        errorUrlMsg.textContent = 'valid url'
        return true
    } else {
        errorUrlMsg.textContent = 'invalid url'
        return false
    }
}
function checkSeatNumber(){
    const seats = parseInt(numberOfSeatsInput.value, 10)
    if (!isNaN(seats) && seats >=0 && seats <=30){
        errorSeatsMsg.textContent = '1-30'
        return true
    } else {
        errorSeatsMsg.textContent = 'Seats must be between 0 and 30'
        return false
    }
}
function checkInputs(){
    const isTitleValid = checkTitle()
    const isUrlValid = checkValidUrl()
    const isSeatsValid = checkSeatNumber()
    if(isTitleValid && isUrlValid && isSeatsValid){
        createMovieBtn.classList.add('enabled')
        createMovieBtn.addEventListener('click', createMovieContainer)
    } else {
        createMovieBtn.classList.remove('enabled')
        createMovieBtn.removeEventListener('click', createMovieContainer)
    }
}
function createMovieContainer(){
    if (createMovieBtn.classList.contains('enabled')){
        createMovieBtn.onclick = () => {

        }
    }
    alert('Movie created successfully!')
    console.log('movie container created!')
}

titleInput.addEventListener('input', checkInputs)
imageInput.addEventListener('input', checkInputs)
numberOfSeatsInput.addEventListener('input', checkInputs)
