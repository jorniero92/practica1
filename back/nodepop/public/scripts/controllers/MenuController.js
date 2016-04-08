angular.module('recipesAngular').controller("MenuController", ["$scope", "APIClient", "$log", "HtmlStorage", "$location", "paths", function($scope, APIClient, $log, HtmlStorage, $location, paths) {
    //Inyectamos dependencia de scope

    $scope.model = {
        selectedItem: paths.login
    };
    //sate provider
    //$scope.uiState = 'loading';
    $scope.paths = paths;
    //Scope methods

    
    $scope.getClassForItem = function(item) {
        if ($scope.model.selectedItem == item) {
            return "active";
        } else {
            return "";
        }
    };

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
