angular.module("recipesAngular").directive("mediaItemList", function() {
    return {
        restrict: "AE",
        scope: {
            model: "=items",
            getDetailUrl: "&",
            rentMovie: "&",
            rented: "=",
            rentedId: "="
        },
        templateUrl: "views/mediaItemList.html"
    };
});
