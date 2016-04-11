angular.module('recipesAngular').controller('LoginController', ["$scope", "$window", "HtmlStorage", "APIClient", "$location", function($scope, $window, HtmlStorage, APIClient, $location) {
    //scope init:
    $scope.model = {}
    
    //scope methods:
    $scope.logUser = function() {
        APIClient.logIn($scope.model).then(
            function(response) {
                //console.info("usuario y contrseña escrita: ", $scope.model);
                HtmlStorage.setLogin($scope.model.username);
                var user = HtmlStorage.getUser();
                console.log("user en login: ", user);

                if (response.err == true) {

                    $location.path('/recipeList');
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", "Recipe List");
                    $scope.model = {};

                } else {
                    window.alert("Error, usuario o contraseña incorrecta");
                }
            },
            function(error) {
                $location.path('/error');
                console.log("error al hacer Login", error);
            }
        );
    }
}]);
