angular.module("pelisAngular").controller("AppController",

    //Cada vez que queramos utilizar un servicio lo tenemos que inyectar tanto como parametro como
    //en la funcion
    ["$scope", "$sce", "APIClient", "HtmlStorage", "$location", "paths", function($scope, $sce, APIClient, HtmlStorage, $location, paths) {
        var controller = this;

        controller.titles = {};

        controller.titles[paths.movies] = "Movies List";

        //Model init
        $scope.model = {
            title: ""
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
        
        $scope.$on("$locationChangeSuccess", function(evt, currentRoute) {
            console.log("$locationChangeSuccess", $location.path());
            $scope.model.title = controller.titles[$location.path()] || "404 Not Found";
            if ($location.path() == paths.login) {
                $scope.menu = false;
            } else {
                $scope.menu = true;
            }

        });

        $scope.$on("ChangeTitle", function(evt, title) {
            $scope.model.title = title;
        });

        $scope.login = function(username, password) {
            console.info("login username: ", username);
            console.info("login password: ", password);

            APIClient.comproveLogin(username, password).then(
                //pelicula encontrada
                function(movie) {
                    console.info("movie peli encontrada");
                    $scope.model = movie;
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", $scope.model.title);
                },
                //pelicula no encontrada
                function(error) {
                    $location.url(paths.notFound);
                }
            );

            HtmlStorage.saveUser(username);
            console.info("username", HtmlStorage.username);
            $location.url(paths.movieList);
        };


    }]
);
