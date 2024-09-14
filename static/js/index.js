import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        // { path: '/', view: () => console.log('Viewing Dashboard') },
        // { path: '/post', view: () => console.log('Viewing Post') },
        // { path: '/settings', view: () => console.log('Viewing Settings') },
        
        { path: '/devscool/', view: Dashboard },
        { path: '/devscool/posts', view: Posts },
        { path: '/devscool/settings', view: Settings },
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }
    
    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();

    console.log(view);
}

window.addEventListener("popstate", router);


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
   
    router();
    
})

