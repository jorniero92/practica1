angular.module('recipesAngular').controller("MenuController", ["$scope", "APIClient", "$log", "HtmlStorage", "$location", "paths", function($scope, APIClient, $log, HtmlStorage, $location, paths) {
    //Inyectamos dependencia de scope

    $scope.model = {
        selectedItem: paths.login
    };
    $scope.uiState = 'loading';
    //$scope.paths = paths;
    //Scope methods
    APIClient.getItems().then(
        //Promesa resuelta:
        function(data) {
            $log.log("SUCCESS", data);
            $scope.model = data.items;
            console.info("data: ", data);
            if ($scope.model.length == 0) {
                $scope.uiState = 'blank'
            } else {
                $scope.uiState = 'ideal'
            }
        },
        //Promesa rechazada:
        function(data) {
            $log.error("Error", data);
            $scope.uiState = 'error';
        }
    );

    $scope.logout = function() {
        HtmlStorage.removeUser();
    };

    $scope.$watch("model.selectedItem", function(newValue, oldValue) {
        $scope.$emit("OnMenuChange", newValue);
    });

    $scope.$on("$locationChangeSuccess", function(evt, currentRoute) {
        $scope.model.selectedItem = $location.path();
    });

}]);
