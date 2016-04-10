angular.module('recipesAngular').controller('LoginController', ["$scope", "$window", "HtmlStorage", "APIClient", "$location", function($scope, $window, HtmlStorage, APIClient, $location) {
    //scope init:
    $scope.model = {}
        //scope methods:
    $scope.logUser = function() {
        APIClient.logIn($scope.model).then(
            function(response) {
                console.info("usuario y contrseña escrita: ", $scope.model);
                HtmlStorage.setLogin($scope.model.username);
                var user = HtmlStorage.getUser();

                //console.log("Usuario logeado como, user: ", user);

                
                if (response.err == true) {

                    $location.path('/recipeList');
                    $scope.uiState = 'ideal';//descomentado
                    $scope.$emit("ChangeTitle", "Recipe List");
                    $scope.model = {};
                    //console.log('Login Hecho,Estoy dentro', response);
                    
                } else {
                    window.alert("Error, usuario o contraseña incorrecta");
                    //console.log('Login Incorrecto', response);

                }

            },
            function(error) {
                $location.path('/error');
                console.log("error al hacer Login", error);
            }
        );
    }
}]);
