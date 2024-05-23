//functions from logIn page
import {goToRegularUserPages, goToAdminUserPages} from "./logInPage.js";
//functions from movieList page
import {checkUserRole, logOutFromSession} from "./movieList.js";

goToRegularUserPages();
goToAdminUserPages();
checkUserRole();
logOutFromSession();