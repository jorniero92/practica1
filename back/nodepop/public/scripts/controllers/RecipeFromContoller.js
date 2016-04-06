angular.module("recipesAngular").controller("RecipeFormController", ["$scope", "APIClient", function($scope, APIClient) {

    $scope.model = {};
    $scope.successMessage = null;
    $scope.errorMessage = null;

    $scope.saveRecipe = function() {
        APIClient.createRecipe($scope.model).then(
            function(recipe) {
                $scope.successMessage = "Recipe saved! <a href=\"#/recipes/" +
                    recipe.id + "\">View new recipe detail</a>";
                $scope.model = {};
                $scope.recipeForm.$setPristine();
            },
            function(error) {
                $scope.errorMessage = "Fatal error. The end is near";
            }
        )
    };
}]);
