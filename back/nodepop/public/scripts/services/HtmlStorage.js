angular.module("pelisAngular").service("HtmlStorage", ["$http", "$q", "apiPath", "URL", function($http, $q, apiPath, URL) {

    this.user = null;
    
    /*
    exports.get_enviar_mensaje = function(req, res) {
        enviar_mensaje(req, res);
    }
    */

    this.saveUser = function(username) {
        localStorage.setItem("username", username);
        console.info("username save User", username);
    };
    this.getUser = function() {
        return localStorage.getItem("username");
    };

    this.removeUser = function() {
        localStorage.removeItem("username");
    };

}]);
