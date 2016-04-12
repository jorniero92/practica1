angular.module("recipesAngular").value("apiPath", {
    login: "/api/users",
    recipes: "/api/v1/recipes",
    items: "/api/v1/recipes",
    recipeDetail: "/api/v1/recipes/:id"
    //recipesDetail: "/api/recipesDetail/:id"
    //recipesDetail: "/api/recipesDetail"
});