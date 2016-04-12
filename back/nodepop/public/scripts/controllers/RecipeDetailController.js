angular.module("recipesAngular").controller("RecipeDetailController", ["$scope", "$routeParams", "$location", "APIClient", "paths",
        function($scope, $routeParams, $location, APIClient, paths) {
            //scope init
            $scope.model = {};
            $scope.uiState = 'loading';
            $scope.$emit("ChangeTitle", "Loading...");
            APIClient.getRecipe($routeParams.id).then(
                //pelicula encontrada
                function(recipe) {
                    console.log("getRecipe en RecipeDetailController: ", recipe);
                    $scope.model = recipe;
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", $scope.model.title);
                },
                //pelicula no encontrada
                function(error) {
                    $location.url(paths.notFound);
                }
            );

        }
    ]

);
