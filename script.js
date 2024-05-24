//functions from logIn page
import {goToRegularUserPages, goToAdminUserPages} from "./logInPage.js";
//functions from movieList page
import {checkUserRole, logOutFromSession, checkInputs, displayMovies} from "./movieList.js";

goToRegularUserPages();
goToAdminUserPages();

checkUserRole();
logOutFromSession();
checkInputs()
displayMovies()

