const logOut = document.getElementById('logOutBtn');
const createNewMovieBtn = document.getElementById('createNewMovieBtn');
const createNewMovie = document.getElementById('createNewMovie');

export function checkUserRole(){
    let userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        if (userInfo.role === 'admin') {
            console.log("Welcome admin:", userInfo.username)
            createNewMovieSession()
        } else {
            console.log("Welcome regular user:", userInfo.username)
            if (createNewMovieBtn) {
                createNewMovieBtn.classList.add('d-none')
                createNewMovie.classList.add('d-none')
            }
        }
    } else {
        console.log("no user is currently logged in")
        // window.location.href = 'index.html'
    }
}
export function logOutFromSession(){
    logOut.onclick = () => {
        localStorage.removeItem('userInfo');
        window.location.href = 'index.html'
    }
}
function createNewMovieSession(){
    createNewMovieBtn.onclick = () => {
        createNewMovie.classList.toggle('d-none')
    }
}