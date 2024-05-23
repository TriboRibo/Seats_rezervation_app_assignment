//LogIn page
const regularUser = document.getElementById('regularBtn');
const adminUser = document.getElementById('adminBtn');

function saveUser(role) {
    let user = {
        username: role === 'admin' ? "admin_user" : "regular_user",
        role: role,
    }
    localStorage.setItem('userInfo', JSON.stringify(user))
    window.location.href = 'movieList.html'
}
export function goToRegularUserPages() {
    regularUser.onclick = () => {
        saveUser('regular')
    }
}
export function goToAdminUserPages() {
    adminUser.onclick = () => {
        saveUser('admin')
    }
}





