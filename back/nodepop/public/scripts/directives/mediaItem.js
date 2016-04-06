angular.module("recipesAngular").directive("mediaItem", function() {
    return {
        restrict: "AE",
        scope: {
            model: "=item"
        },
        templateUrl: "views/mediaItem.html"
    };
});