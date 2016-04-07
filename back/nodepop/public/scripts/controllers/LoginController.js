angular.module('recipesAngular').controller('LoginController', ["$scope", "$window", "APIClient","$location", function($scope, $window, APIClient, $location) {
    //scope init:
    $scope.model = {}
    //scope methods:
    $scope.logUser = function() {
        APIClient.logIn($scope.model).then(
            function(response) {
                LogUser.setLogin($scope.model.nickname);
                var user = LogUser.getLogin();
                console.log("Usuario logeado como", user);
            
                 $location.path('/recipeList');
                $scope.model = {};
                console.log('Login Hecho,Estoy dentro', response);
            },
            function(error) {
                $location.path('/jgedffg');
                console.log("error al hacer Login", error);
            }
        );
    }
}]);
