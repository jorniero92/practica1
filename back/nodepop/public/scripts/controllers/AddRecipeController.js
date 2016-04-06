angular.module("recipesAngular").controller("AddMovieController", ["$scope", "$location", "$routeParams", "$log", "APIClient", "URL", "paths",
    function($scope, $location, $routeParams, $log, APIClient, URL, paths) {

        //scope init
        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        // Controller init
        $scope.$emit("ChangeTitle", "Add Recipe");


        $scope.addMovie = function() {
            APIClient.createMovie($scope.model).then(
                function(movie) {                
                    $location.url(paths.movieList);
                },
                function(error) {
                    $scope.errorMessage = "Fatal error. The end is near";
                }
            )
        };

    }
]);
