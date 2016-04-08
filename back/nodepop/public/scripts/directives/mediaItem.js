angular.module("recipesAngular").directive("mediaItem", function() {
    return {
        restrict: "AE",
        templateUrl: "views/mediaItem.html",
        scope: {
            model: "=item"
        }
    };
});