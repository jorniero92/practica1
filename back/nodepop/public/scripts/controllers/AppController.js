angular.module("recipesAngular").controller("AppController",
    ["$scope", "$sce", "APIClient", "HtmlStorage", "$location", "paths", function($scope, $sce, APIClient, HtmlStorage, $location, paths) {
        var controller = this;

        controller.titles = {};

        controller.titles[paths.recipeList] = "recipeList";

        //Model init
        $scope.model = {
            title: ""
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
        
        $scope.$on("$locationChangeSuccess", function(evt, currentRoute) {
            //console.log("$locationChangeSuccess", $location.path());
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
            var user = { nombre: username, clave: password};
            APIClient.comproveLogin(user).then(
                //pelicula encontrada
                function(recipe) {
                    console.info("login ok AppController");
                    $scope.model = recipe;
                    $scope.uiState = 'ideal';
                    $scope.$emit("ChangeTitle", $scope.model.title);

                },
                //pelicula no encontrada
                function(error) {
                    console.info("error en login");
                    $location.url(paths.notFound);
                }
            );

            HtmlStorage.saveUser($scope.model.username);
            $location.url(paths.recipeList);
        };


    }]
);
