angular.module("recipesAngular").service("HtmlStorage", ["$http", "$q", "apiPath", "URL", "$window", function($http, $q, apiPath, URL, $window) {

    this.user = null;

    this.setLogin = function(username) {
        window.localStorage.setItem("username", username);
    };

    this.getUser = function() {
        return window.localStorage.getItem("username");
    };

    this.isLogin = function() {
        var user = window.localStorage.getItem("username") || "";
        if (user == "") {
            return false;
        } else {
            return true;
        }
    };

    this.removeUser = function() {
        window.localStorage.removeItem("username");
    };

}]);
