angular.module("recipesAngular").service("HtmlStorage", ["$http", "$q", "apiPath", "URL", "$window", function($http, $q, apiPath, URL, $window) {

    this.user = null;

    this.saveUser = function(username) {
        window.localStorage.setItem("username", username);
    };
    /*
        this.setLogin = function(nick) {
            // Guardar el usuario en memoria del navegador
            window.localStorage.setItem("nick", nick);
        };
    */
    this.getUser = function() {
        return window.localStorage.getItem("username");
    };
    /*
    this.getLogin = function() {
        // Recuperamos el usuario guardado en el navegador
        // console.log (window.localStorage.getItem("user"));
        return window.localStorage.getItem("nick");
    };
    */
    this.isLogin = function() {
        var user = window.localStorage.getItem("username") || "";
        if (user == "") {
            return false;
        } else {
            return true;
        }
    };
/*
    this.isLogin = function() {
        var user = window.localStorage.getItem("nick") || "";
        if (user == "") {
            return false;
        } else {
            return true;
        }
    }
*/
    this.removeUser = function() {
        window.localStorage.removeItem("username");
    };

}]);
