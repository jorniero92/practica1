angular.module("recipesAngular").controller("RecipeListController", ["$scope", "$location", "HtmlStorage","$log", "APIClient", "URL", "paths",
    function($scope, $location, HtmlStorage, $log, APIClient, URL, paths) {

        /*Redireccion si no esta logeado*/
        if(!HtmlStorage.getUser()){
            $location.url(paths.login);
            console.info("Redireccion si no esta logeado RecipeListController: ", HtmlStorage.getUser());
        }

        $scope.model = [];

        $scope.uiState = 'loading';        

        $scope.getRecipeDetailURL = function(recipe) {
            console.info("getRecipeDetailURL: ", paths.recipeDetail);
            return URL.resolve(paths.recipeDetail, { id: recipe.id });
        };


        APIClient.getItems().then(
            // promesa resuelta
            function(data) {
                $log.log("SUCCESS", data);
                $scope.model = data;
                if ($scope.model.length == 0) {
                    $scope.uiState = 'blank';
                } else {
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", "Recipes");
                }
            },
            // promesa rechazada
            function(data) {
                $log.error("ERROR", data);
                $scope.uiState = 'error';
            }

        );
    }
]);
