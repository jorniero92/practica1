angular.module("recipesAngular").controller("AddRecipeController", ["$scope", "$location", "$routeParams", "$log", "APIClient", "URL", "paths",
    function($scope, $location, $routeParams, $log, APIClient, URL, paths) {

        //scope init
        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        // Controller init
        $scope.$emit("ChangeTitle", "Add Recipe");


        $scope.addRecipe = function() {
            APIClient.createRecipe($scope.model).then(
                function(recipe) {
                    console.info("peli guardada");
                    $location.url(paths.recipeList);
                },
                function(error) {
                    $scope.errorMessage = "Fatal error. The end is near";
                }
            )
        };
/*
        $(document).ready(function() {

            var MaxInputs = 20; //Número Maximo de Campos
            var contenedor = $("#contenedor"); //ID del contenedor
            var AddButton = $("#agregarCampo"); //ID del Botón Agregar

            //var x = número de campos existentes en el contenedor
            var x = $("#contenedor div").length + 1;
            var FieldCount = x - 1; //para el seguimiento de los campos

            $(AddButton).click(function(e) {
                if (x <= MaxInputs) //max input box allowed
                {
                    FieldCount++;
                    //agregar campo
                    $(contenedor).append('<div><input type="text" name="mitexto[]" id="campo_' + FieldCount + '" placeholder="Texto ' + FieldCount + '"/><a href="#" class="eliminar">&times;</a></div>');
                    x++; //text box increment
                }
                return false;
            });

            $("body").on("click", ".eliminar", function(e) { //click en eliminar campo
                if (x > 1) {
                    $(this).parent('div').remove(); //eliminar el campo
                    FieldCount--;
                    x--;
                }
                return false;
            });
        });

*/



    }
]);
