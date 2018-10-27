angular.module("MeuModulo").run(function($rootScope) {
    $rootScope.plataformas = [];
    $rootScope.plataformaSelecionada = "";
    $rootScope.planos = [];
    $rootScope.planoSelecionado = "";
    $rootScope.carregando = true;
})
.controller("IndexController", function ($rootScope, $scope, $http) {
    $scope.msg = "Escolha uma plataforma e clique em Próximo:";
    $rootScope.carregando = true;

    var init = function () {
        //$http.get('plataformas.json')
        $http.get('http://private-59658d-celulardireto2017.apiary-mock.com/plataformas')
        .then(
            function (response) {
                $rootScope.plataformas = response.data.plataformas;
                $rootScope.carregando = false;
            }).catch(
            function (error) {
                console.log(error);
            });    
    };

    $scope.salvarPlataforma = function(sku) {
        $rootScope.plataformaSelecionada = sku;
    }; 

    init();
})
.controller("PlanosController", function ($rootScope, $scope, $http, $location) {
    $scope.msg = "Escolha uma plano e clique em Próximo:";
    $rootScope.carregando = true;

    var init = function () {
        let urlPath = "";
        let platSel = $rootScope.plataformaSelecionada;
        if(platSel === "" || platSel === undefined)
            $location.path('/home');
        else {
            if(platSel === "TBT01")
                urlPath = "http://private-59658d-celulardireto2017.apiary-mock.com/planos/TBT01";
                //urlPath = "planos-tablet.json";
            else if(platSel === "CPT02")
                urlPath = "http://private-59658d-celulardireto2017.apiary-mock.com/planos/CPT02";
                //urlPath = "planos-computador.json";
            else if(platSel === "WF03")
                urlPath = "http://private-59658d-celulardireto2017.apiary-mock.com/planos/WF03";
                //urlPath = "planos-wifi.json";      

            $http.get(urlPath)
            .then(
                function (response) {
                        $rootScope.planos = response.data.planos;
                        $rootScope.carregando = false;                    
                }).catch(
                function (error) {
                    console.log(error);
                });
        }
    };

    $scope.salvarPlano = function(sku) {
        $rootScope.planoSelecionado = sku;
    };
    
    init();    
})
.controller("DadosPessoaisController", function ($rootScope, $scope) {
    $scope.titulo = "Dados Pessoais";
    $scope.dadosPessoais = {};
    let planoSel = $rootScope.planoSelecionado;
    if(planoSel === "" || planoSel === undefined)
        $location.path('/planos');
    else {
        $scope.concluirCadastro = function() {
            let ret = { 
                plataforma: $rootScope.plataformaSelecionada,
                plano: $rootScope.planoSelecionado,
                nome: $scope.dadosPessoais.nome, 
                email: $scope.dadosPessoais.email,
                telefone: $scope.dadosPessoais.telefone, 
                nascimento: $scope.dadosPessoais.nascimento, 
                cpf: $scope.dadosPessoais.cpf
            }
            console.log(ret);
        }; 
    }
})