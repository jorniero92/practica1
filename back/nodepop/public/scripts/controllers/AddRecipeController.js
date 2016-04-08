angular.module("recipesAngular").controller("AddRecipeController", 
    ["$scope", "$location", "$routeParams", "$log", "APIClient", "URL", "paths",
    function($scope, $location, $routeParams, $log, APIClient, URL, paths) {

        //scope init
        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        // Controller init
        $scope.$emit("ChangeTitle", "Add Recipe");


        $scope.saveRecipe = function() {
            APIClient.createRecipe($scope.model).then(
                function(recipe) {                
                    $location.url(paths.recipeList);
                },
                function(error) {
                    $scope.errorMessage = "Fatal error. The end is near";
                }
            )
        };
    }
]);
