angular.module("recipesAngular").filter("rentFilter", ["$filter","HtmlStorage", function($filter, HtmlStorage) {
    return function(data) {
        return $filter('filter')(data, {userRent: HtmlStorage.getUser()});
    };
}]);
