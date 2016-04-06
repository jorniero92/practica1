angular.module("recipesAngular").service("APIClient", ["$http", "$q", "apiPath", "URL", function($http, $q, apiPath, URL) {
    console.info("apiPath en APIClient: ", apiPath);

    this.apiRequest = function(nombre, clave) {
        var deferred = $q.defer();
        //Hacer trabajo asíncrono
        $http.get(nombre, clave).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        );
        //Devolver promesa      
        return deferred.promise;
    };

    this.comproveLogin = function(user) {
        var deferred = $q.defer();

        //Hacer trabajo asíncrono
        $http.post(apiPath.login, user).then(
            function(response) {
                console.info("comproveLogin OK");
                //console.info("comproveLogin response.data OK:", response.data);
                //Resolvemos promesa
                deferred.resolve(response.data);
            },
            function(response) {
                //Rechazar promesa
                console.info("comproveLogin KO");
                deferred.reject(response.data);
            }
        );
        //Devolver promesa      
        return deferred.promise;
    };

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


    /*crear una nueva receta, hacer un post a la URL */
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
