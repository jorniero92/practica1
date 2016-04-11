angular.module("recipesAngular").controller("RecipeListController", ["$scope", "$location", "HtmlStorage", "$log", "APIClient", "URL", "paths",
    function($scope, $location, HtmlStorage, $log, APIClient, URL, paths) {

        /*Redireccion si no esta logeado*/
        if (!HtmlStorage.getUser()) {
            $location.url(paths.login);
        }

        $scope.model = [];

        $scope.uiState = 'loading';

        $scope.getRecipeDetailURL = function(recipes) {
            //console.log("recipes: ", recipes);
            return URL.resolve(paths.recipeDetail, { id: recipes._id });
        };


        APIClient.getRecipes().then(
            // promesa resuelta
            function(data) {
                //$log.log("SUCCESS: ", data.recipes);
                $scope.model = data.recipes;
                if ($scope.model.length == 0) {
                    $scope.uiState = 'blank';
                } else {
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", "Recipes");
                }
            },
            // promesa rechazada
            function(data) {
                $log.error("ERROR: ", data);
                $scope.uiState = 'error';
            }

        );
    }
]);
