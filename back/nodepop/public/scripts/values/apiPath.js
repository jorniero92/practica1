angular.module("recipesAngular").value("apiPath", {
    items: "/api/v1/items",
    itemDetail: "/api/v1/items/:id",
    users: "/api/v1/users",
    loginApiPath: "/api/v1/login"
        /*
        	login: "/api/users",
        	recipes: "/api/anuncios"
        */
});
