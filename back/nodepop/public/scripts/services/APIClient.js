angular.module("recipesAngular").service("APIClient", ["$http", "$q", "apiPath", "URL", function($http, $q, apiPath, URL) {
    console.info("apiPath en APIClient: ", apiPath);
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
        return this.apiRequest(apiPaths.items);
    };

    this.getItem = function(itemID) {
        var url = URL.resolve(apiPaths.itemDetail, { id: itemID });
        return this.apiRequest(url);
    };
/*
    this.registerUser = function(user) {
        var deferred = $q.defer();
        $http.post(apiPaths.users, user).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        );
        return deferred.promise;
    };
*/
    this.logIn = function(user) {
        var deferred = $q.defer();
        $http.post(apiPaths.login, user).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        );
        return deferred.promise;
    };

    /*

    this.getUser = function() {
        return this.apiRequest(apiPath.nombre, apiPath.clave);
    };


    this.getRecipes = function() {
        return this.apiRequest(apiPath.recipes);
    };

    this.getRecipe = function(recipeId) {
        var url = URL.resolve(apiPath.recipeDetail, { id: recipeId });
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
    */
}]);
