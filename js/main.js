//  HELLOW-FORASTEIRO ==================================================================================================================
//  Hey, se esta por aqui procura por conhecimento, então temos algo em comum.. Utilizei este projeto apenas como desafio pessoal
//  e no momento o utilizo como portifolio pessoal, bom indo direto ao ponto, deixo claro que pode utilizar como bem entender o codigo
//  e artes aqui contidas, como pode notar tambem gosto de comentar tudo que faço então acredito que sera bem simples entender a logica.
//  e metodologia que ultilizei para desenvolver esse game, contudo.. Tenha um bom divertimento e boa sorte com a abstração.


//  CONFIGURAÇÕES-GLOBAIS ==============================================================================================================
/*  global Mapa, Personagem, Camera, Image, fonteTema, colisaoPorPixel */
    document.getElementsByTagName("body").onload = fonteTema();


//  FUNÇÃO-PRINCIPAL ===================================================================================================================
    function main(){
    
//  RECURSOS-DO-GAME ====================================================================================================================
//  Neste bloco estão os elementos que formam os recursos do game, como por exemplo o mapa, personagens e inimigos, todos eles
//  são armazenados "empilhados" em um vetor de objetos que futuramente sera renderizado. Aqui também se encontram as principais 
//  variaveis como a variavel canvas que amazena o objeto canvas do DOM e nosso contexto que é responsavel por dar vida a 
//  tela do canvas.. tipo tudo que você desenha nele e renderiza sera exibido dentro do canvas lá no DOM.

    var canvas      = document.getElementById("telaDoJogo");   // Recebendo o objeto "canvas" do DOM.
        canvas.width = document.documentElement.clientWidth - 10;
    var contexto    = canvas.getContext("2d");                 // Indica que o contexto do canvas será em bidimensional.
    var disparos    = [];                                      // Armazena informações dos disparos efetuados.
    var vestijos    = [];                                      // Armazena informações dos vestijos de sangue dos zombis.
    var zombis      = [];                                      // Armazena informações de cada zombi (Isoladamente).
    
    var stringDaVida = "PATRICK + + + +";
    
//  0 -> Patrick
//  1 -> Ayrton 
//  2 -> Eric

    var char = 1;
        
    var mundoDoGame   = new Mapa(0, 0, 5000, 5000, img.mapa, true);
    var player        = new Personagem(1447, 4254, 96, 53,img.playerPatrick, 0, 0);
    var camera        = new Camera(1447, 4254, canvas.width, canvas.height);
    for(var i = 0; i < 20; i++){
            var x = Math.floor((Math.random() * 5000) + 1);
            var y = Math.floor((Math.random() * 2500) + 1);
            var zombi = new Inimigo(x,y,77,77,img.zombi,0,0);
            zombis.push(zombi);
        };
        
//  CAMADA-DE-COLISÃO ===================================================================================================================
//  Os elementos abaixo correspondem ao segundo contexto o contexto de colisão, nele estão contindas as informações em pixels 
//  dos elementos não "ultrapassaveis"... as paredes cadeiras mesas e objetos onde o personagem e o inimigo não poderão atravesar.

    var canvasDeColisao = document.createElement("canvas");
        canvasDeColisao.width  = 5000;
        canvasDeColisao.height = 5000;
        
    var mapento = new Image();
        mapento.src = img.teste;
        
    var contextoDeColisao     = canvasDeColisao.getContext("2d");
        contextoDeColisao.drawImage(mapento, 0, 0);
        

//  MOVIMENTAÇÃO-DO-JOGADOR =============================================================================================================
//  Os elementos de movimentação do player, estão baseados em event listeners em especifico o keydown e o keyup as teclas pressionadas e 
//  não pressionadas, ambos os listeners executam a função de callback movimento que recebe o codigo do evento e o estado atual da tecla
//  em relação a realidade do game.

    var moveEsquerda, moveCima, moveDireita, moveBaixo, cooldownDoSpaco  = false;
    
    window.addEventListener("keydown",function(tecla){movimento(tecla, true)});
    window.addEventListener("keyup", function(tecla) {movimento(tecla, false);player.corteX = 0;});
   
    function movimento(tecla,boleano){
        switch (tecla.keyCode){
            case 37:
                moveEsquerda = boleano;
                break;
            case 38:
                moveCima     = boleano;
                break;
            case 39:
                moveDireita  = boleano;
                break;
            case 40:
                moveBaixo    = boleano;
                break;
            case 32:
                if(cooldownDoSpaco == boleano ){ player.disparar(disparos);  cooldownDoSpaco == boleano;}
                break;
        }
    };
    
//  FUNÇÕES-AUXILIARES ==================================================================================================================
//  Bom por que diversas questões que não julgo relevante comentar aqui, adotei a criação de um codigo mais dinamico e enxuto, porem a 
//  estrutura de um game necessita de três funções primordiais, estas são o "loop", "atualiza", e "renderiza" iriei abordar cada uma 
//  delas isoladamente mais adiante, mas por hora seguindo o que julgo relevante ou não criei estas funções que auxiliam as três funções 
//  mencionadas.

    function atualizaPosicaoDoPlayer(){
        if(moveEsquerda && !moveDireita && !moveCima && !moveBaixo){
            player.atualizaSprite(53,96,53);
            player.direcao = "Esquerda";
            player.pontoX = player.pontoX - 5; 
            player.moveSprite();
        }
        
        if(moveCima && !moveBaixo && !moveDireita && !moveEsquerda){
            player.atualizaSprite(96,53,106);
            player.direcao = "Cima"
            player.pontoY = player.pontoY - 5;
            player.moveSprite();
        }
        
        if(moveDireita && !moveEsquerda && !moveBaixo && !moveCima) {
            player.atualizaSprite(53,96,0);
            player.direcao = "Direita";
            player.pontoX = player.pontoX + 5; 
            player.moveSprite();    
        }
        
        if(moveBaixo && !moveEsquerda && !moveCima && !moveDireita){
            player.atualizaSprite(96,53,202);
            player.direcao = "Baixo"
            player.pontoY = player.pontoY + 5; 
            player.moveSprite();    
        }

    }
    function atualizaPosicaoDisparo(){
        disparos = disparos.filter(function(disparo){
            
            var condicao00 = disparo.pontoX - 300 < player.pontoX && disparo.direcao == "Direita";
            var condicao01 = disparo.pontoX + 300 > player.pontoX && disparo.direcao == "Esquerda";
            var condicao02 = disparo.pontoY - 300 < player.pontoY && disparo.direcao == "Baixo";
            var condicao03 = disparo.pontoY + 300 > player.pontoY && disparo.direcao == "Cima";
            
            return  condicao00  || condicao01 || condicao02 || condicao03
        });
        disparos.forEach(function(disparo){
            disparo.direcao == "Esquerda" ? disparo.pontoX -= 30 : null;
            disparo.direcao == "Direita"  ? disparo.pontoX += 30 : null;
            disparo.direcao == "Cima"     ? disparo.pontoY -= 30 : null;
            disparo.direcao == "Baixo"    ? disparo.pontoY += 30 : null;
        }); 
    }
    function atualizaVidaDoPlayer(){
        player.vida < 300 ? stringDaVida = "PATRICK + + +" : stringDaVida;
        player.vida < 200 ? stringDaVida = "PATRICK + +" : stringDaVida;
        player.vida < 100 ? stringDaVida = "PATRICK +" : stringDaVida; 
    }
    function limitesGerais(){
    //  Para a implementação da limitação do mundo que criei, tive que fazer o uso de duas funções
    //  simples por indicação de um grande amigo meu, com elas faço o uso da recursividade, já que
    //  ambas rebem dois valores uma devolve o maior e a outra o menor.
            
        camera.pontoX = Math.max(0,Math.min(mundoDoGame.largura - camera.largura, camera.pontoX));
        camera.pontoY = Math.max(0,Math.min(mundoDoGame.altura - camera.altura, camera.pontoY));
            
        player.pontoX = Math.max(0,Math.min(mundoDoGame.largura - player.largura, player.pontoX));
        player.pontoY = Math.max(0,Math.min(mundoDoGame.altura - player.altura, player.pontoY));
    }

//  FUNÇÃO-DE-LOOP ======================================================================================================================
//  Esta função é bem simples, sendo franco uma das mais simples, isso é primeiro eu chamo o evento requestAnimationFrame que executa seu 
//  call back a aproximadamente 60 quadros por segundo dentro de uma tela.. Que no caso é o canvas.         
    
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        atualiza();
        renderiza();
        
    }

//  FUNÇÃO-DE-ATUALIZACAO ===============================================================================================================
//  Esta função é uma das mais interessantes por que aqui é onde quase tudo acontece, é onde ocorre a junção dos eventos de tiro e 
//  movimento do player são atualizados, onde acontece a comparação de objetos, a verificação de colisão e mais um monte de coisa que 
//  deixei bem verboso para não precisar comentar aqui... Só que vale lembrar tudo acontece 60 vezes por segundo então uma função 
//  desnecessaria afeta diretamente o desempenho do game.
    
    function atualiza(){
    //  Eventos, ações, interações relativas aos zombis.
        zombis = zombis.filter(function(zombi){
            return zombi.vivo;
        });
        zombis.forEach(function(zombi,indice){
            zombi.seguir(player.pontoX,player.pontoY);
            zombi.naoMeToque(zombi, zombis, player);
            colisaoPorPixel(zombi, contextoDeColisao);
            zombi.levarUmTiro(zombi,disparos,vestijos,player);
        });
    
    //  Eventos, ações, interações relativas ao player.
        atualizaVidaDoPlayer();
        atualizaPosicaoDoPlayer();
        colisaoPorPixel(player,contextoDeColisao);
        
    //  Eventos, ações, interações relativas a outros elementos.
        camera.atualizaPosicao(player);
        atualizaPosicaoDisparo();
        limitesGerais();
    }

//  FUNÇÃO-DE-RENDERIZAÇÃO ==============================================================================================================
//  A função de renderização é bem simples tambem, nela estão contidos apenas os elementos já processados e atualizados como ela tambem 
//  é acionada 60 vezes a cada segundo da a impressão de movimento e tals. mas ela é bem simples e esta dividida entre elemntos dinamicos 
//  a camera e elementos estáticos ou seja o placar, hits e a vida do player, possui a rotina de "limpar a tela", "desenhar tudo atualizado".

    function renderiza(){
    //  CONTEÚDO-DINAMICO ===============================================================================================================
        contexto.clearRect(0,0,mundoDoGame.largura,mundoDoGame.altura); 
        contexto.save();
        contexto.translate(-camera.pontoX, -camera.pontoY);
        
        contexto.drawImage(mundoDoGame.img, 0, 0, mundoDoGame.largura, mundoDoGame.altura, mundoDoGame.pontoX, mundoDoGame.pontoY, mundoDoGame.largura, mundoDoGame.altura);
        vestijos.forEach(function(e){
            contexto.drawImage(e.img, e.corteX, e.corteY, e.largura, e.altura, e.pontoX, e.pontoY, e.largura, e.altura);   
        });
        disparos.forEach(function(e){
            contexto.fillStyle="#ffe700";
            contexto.fillRect(e.pontoX, e.pontoY, e.largura, e.altura);      
        });
        zombis.forEach(function(e){
            contexto.drawImage(e.img, e.corteX, e.corteY, e.largura, e.altura, e.pontoX, e.pontoY, e.largura, e.altura);
        });
        contexto.drawImage(player.img, player.corteX, player.corteY, player.largura, player.altura, player.pontoX, player.pontoY, player.largura, player.altura);
        
    //  CONTEÚDO-DINAMICO ===============================================================================================================
        contexto.restore();
        contexto.fillStyle = "black";
        contexto.fillRect(canvas.width - 202, 10, 200, 30);
        contexto.fillRect(canvas.width - 302, 45, 300, 50);
        contexto.fillStyle = "white";
        contexto.textAlign = "right";
        contexto.textAlign = "right";
        
        contexto.font="22px VT323";
        contexto.fillText(stringDaVida, canvas.width - 25, 30);
        contexto.font="60px VT323";
        contexto.fillText("HITS "+ player.score, canvas.width - 20, 85);
    }
    //  PRIMEIRA-CHAMADA ================================================================================================================
    loop();
}


//  TELA-DE-LOADING ====================================================================================================================
    // var raiz = window.location.href
    // var img={
    //     mapa:  raiz + "/img/background.jpg",
    //     playerPatrick: raiz + "/img/player-patrick.png",
    //     zombi: raiz + "/img/inimigo-vampiro.png",
    //     vestijo: raiz + "/img/inimigo-vestijo.png",
    //     teste: raiz + "/img/camada-de-colisao.jpg",
    //     controles: raiz + "/img/call2.png"
    // };
    
    var raiz = window.location.href
    var img={
        mapa: "/img/background.jpg",
        playerPatrick: "/img/player-patrick.png",
        zombi: "/img/inimigo-vampiro.png",
        vestijo: "/img/inimigo-vestijo.png",
        teste: "/img/camada-de-colisao.jpg",
        controles: "/img/call2.png"
    };
    
    function loadImages(sources, callback) {
            var images = {};
            var loadedImages = 0;
            var numImages = 0;
            
            for(var src in sources) {
              numImages++;
            }
           //0 console.log(sources);
            for(var src in sources) {
              images[src] = new Image();
              images[src].onload = function(){
                //console.log("Loading ... "+ ( (loadedImages/ numImages )* 100));
                telaLoading((loadedImages/ numImages )* 100);
                if(++loadedImages >= numImages) {
                  telaLoading((loadedImages/ numImages )* 100);
                  callback(images);
                }
              };
              images[src].src = sources[src];
            }
    }
    function start(){
        loadImages(img, function() {
            //main();
            telaMenu();
        });
    }
    function telaLoading(passo){
        var canvas = document.getElementById("telaDoJogo");
            canvas.width = document.documentElement.clientWidth - 10;
        var contexto = canvas.getContext("2d");
        contexto.clearRect(0,0,canvas.width,canvas.height);
        contexto.font = "60px VT323";
        contexto.fillStyle = "white";
        contexto.fillText("LOADING... "+ passo.toFixed(1) +"%", canvas.width/2.8, canvas.height/2);
    }
    