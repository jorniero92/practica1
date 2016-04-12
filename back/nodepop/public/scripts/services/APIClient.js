angular.module("recipesAngular").service("APIClient", ["$http", "$q", "apiPath", "URL", function($http, $q, apiPath, URL) {

    this.apiRequest = function(url) {
        var deferred = $q.defer();
        $http.get(url).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        );
        return deferred.promise;
    };

    this.getItems = function() {
        return this.apiRequest(apiPath.items);
    };

    this.getItem = function(itemID) {
        //var url = URL.resolve(apiPath.itemDetail, { id: itemID });
        var url = URL.resolve(apiPath.itemDetail);
        return this.apiRequest(url);

    };

    this.logIn = function(username) {
        var deferred = $q.defer();
        $http.post(apiPath.login, username).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        );
        return deferred.promise;
    };


    this.getRecipes = function() {
        return this.apiRequest(apiPath.recipes);
    };

    this.getRecipe = function(recipeId) {
        var url = URL.resolve(apiPath.recipesDetail, { recipeId: recipeId });
        console.log("url: ", url, recipeId, apiPath.recipeDetail);
        return this.apiRequest(url);
    };

    //crear una nueva receta, hacer un post a la URL 
    this.createRecipe = function(recipe) {
        // Crear el objeto diferido
        var deffered = $q.defer();
        $http.post(apiPath.recipes, recipe).then(
            //peticion OK
            function(response) {
                //resolver la promesa
                deffered.resolve(response.data);
            },
            //peticion KO
            function(response) {
                //rechazar la promesa
                deffered.reject(response.data);
            }
        );
        //devolver la promesa
        return deffered.promise;
    };

}]);
