angular.module('recipesAngular').controller('LoginController', ["$scope", "$window", "HtmlStorage", "APIClient", "$location", function($scope, $window, HtmlStorage, APIClient, $location) {
    //scope init:
    $scope.model = {}
        //scope methods:
    $scope.logUser = function() {
        APIClient.logIn($scope.model).then(
            function(response) {
                console.info("nombre de usuario en scope.model ok: ", $scope.model);
                HtmlStorage.setLogin($scope.model.username);
                var user = HtmlStorage.getUser();
                $location.path('/recipeList');
                $scope.uiState = 'ideal';
                $scope.$emit("ChangeTitle", $scope.model.title);
                $scope.model = {};
                console.log('Login Hecho,Estoy dentro', response);
/*
                console.log("Usuario logeado como", user);
                if (HtmlStorage.isLogin() == true) {
                    $location.path('/recipeList');
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", $scope.model.title);
                    $scope.model = {};
                    console.log('Login Hecho,Estoy dentro', response);
                } else {
                    $location.path('/');
                    $scope.model = {};
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", $scope.model.title);
                    console.log('Login Incorrecto', response);
                }
*/
            },
            function(error) {
                $location.path('/error');
                console.log("error al hacer Login", error);
            }
        );
    }
}]);
