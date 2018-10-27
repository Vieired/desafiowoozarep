angular.module("MeuModulo", ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
	.when("/home", {
		templateUrl: "templates/home.html",
		controller: "IndexController"
	})
	.when("/planos", {
		templateUrl: "templates/planos.html",
		controller: "PlanosController"
	})
	.when("/dadospessoais", {
		templateUrl: "templates/dadospessoais.html",
		controller: "DadosPessoaisController"
	});	

	$routeProvider.otherwise({redirectTo: "/home"});
})