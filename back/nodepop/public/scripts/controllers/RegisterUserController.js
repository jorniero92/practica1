angilar.module("recipesAngular").controller("RegisterUserController", ["$scope", "APIClient", function($scope, APIClient) {
    $scope.model = {};
    $scope.saveUser = function() {
        APIClient.registerUser($scope.model).then(
            function(user) {
                $scope.successMessage = "¡User Saved!";
                $scope.model = {};
                $scope.registerForm.$setPristine();
                console.info("USUARIO REGISTRADO", user);
            },
            function(error) {
                $scope.errorMessage = "This nickname is already in use";
                console.info("ERROR AL REGISTRAR USUARIO", error);
            }
        )
    };
}]);
