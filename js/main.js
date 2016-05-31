// fonte global..
WebFontConfig = {
    google: { families: [ 'VT323::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
 
function main(){
// =========================================================================
  
 
// =========================================================================   
    
    
//  RECURSOS-DO-GAME===================================================================================================
//  Neste bloco estão os elementos que formam os recursos do game, como por exemplo o mapa, personagens e
//  inimigos, todos eles são armazenados "empilhados" em um vetor de objetos que futuramente sera renderizado.
//  Aqui também se encontram as principais variaveis como a variavel canvas que amazena o objeto canvas do DOM
//  e nosso contexto que é responsavel por dar vida a tela do canvas.. tipo tudo que você desenha nele e renderiza
//  sera exibido dentro do canvas lá no DOM.
    
    var canvas       = document.getElementById("telaDoJogo");   // Recebendo o objeto "canvas" do DOM.
    var contexto     = canvas.getContext("2d");                 // Indica que o contexto do canvas será em Bidimensional.
    var sprites      = [];                                       // Armazena todos os objetos a serem renderizados.
    var disparos     = [];
    var vestijos     = [];
    var corpos       = [];
    var vampiros     = [];
    var stringDaVida = "PATRICK + + + +";
    var nPassara     = [
        new Parede(393 , 588,   3270,   24,     393 ,   588 ),
        new Parede(393 , 978,   450,    24,     393 ,   978 ),
        new Parede(938 , 978,   318,    24,     938 ,   978 ),
        new Parede(1358, 978,   367,    24,     1358,   978 ),
        new Parede(1818, 978,   690,    24,     1818,   978 ),
        new Parede(2586, 978,   460,    24,     2586,   978 ),
        new Parede(3148, 978,   226,    24,     3148,   978 ),
        new Parede(3473, 978,   190,    24,     3473,   978 ),
        new Parede(1200, 588,   24,     414,    1200,   588 ),
        new Parede(1608, 588,   24,     414,    1608,   588 ),
        new Parede(2194, 588,   24,     414,    2194,   588 ),
        new Parede(2883, 588,   24,     414,    2883,   588 ),
        new Parede(3637, 588,   24,     440,    3637,   588 ),
        new Parede(386 , 588,   24,     1082,   386,    588 ),
        new Parede(749 , 978,   24,     62,     749,    978 ),
        new Parede(749 , 1120,  24,     374,    749,    1120), 
        new Parede(393 , 1468,  425,    24,     393,    1468), 
        new Parede(393 , 1646,  448,    24,     393,    1646),    
        new Parede(968 , 1646,  2695,   24,     968,    1646), 
        new Parede(993 , 1232,  24,     437,    993,    1232),    
        new Parede(993 , 1232,  57,     24,     993,    1232), 
        new Parede(1148, 1232,  660,    24,     1148,   1232), 
        new Parede(1753, 1232,  24,     437,    1753,   1232), 
        new Parede(1753, 1232,  56,     24,     1753,   1232), 
        new Parede(1909, 1232,  1072,   24,     1909,   1232), 
        new Parede(2435, 1232,  24,     437,    2435,   1232), 
        new Parede(1899, 723 ,  200,    200,    1899,   723 ),  
        new Parede(3637, 1196,  24,     473,    3637,   1196),          
        new Parede(422 , 661,   429,    70,     422 ,   661 ),        
        new Parede(422 , 846,   429,    70,     422 ,   846 ),        
        new Parede(416 , 1109,  72,     360,    416 ,   1109),         
        new Parede(603 , 1109,  72,     360,    603 ,   1109),         
        new Parede(1233, 724,   376,    63,     1233,   724 ),        
        new Parede(1639, 610,   405,    45,     1639,   610 ),         
        new Parede(1386, 1320,  361,    73,     1386,   1320),        
        new Parede(1386, 1489,  361,    73,     1386,   1489),        
        new Parede(1993, 1313,  431,    70,     1993,   1313),      
        new Parede(1994, 1497,  430,    70,     1994,   1497),
        new Parede(948    ,2237  ,2715    ,24, 948    ,2237),
        new Parede(948    ,2237  ,24      ,1089 , 948    ,2237),
        new Parede(948    ,3302  ,1855    ,24, 948    ,3302),
        new Parede(2988   ,3302  ,1516    ,24, 2988   ,3302),
        new Parede(948    ,2631  ,1504    ,24, 948    ,2631),
        new Parede(2538   ,2631  ,357     ,24, 2538   ,2631),
        new Parede(2980   ,2631  ,75      ,24, 2980   ,2631),
        new Parede(3334   ,2633  ,173     ,24, 3334   ,2633),
        new Parede(3592   ,2633  ,71      ,24, 3592   ,2633),
        new Parede(1225   ,2630  ,24      ,106, 1225   ,2630),
        new Parede(1225   ,2820  ,24      ,505, 1225   ,2820),
        new Parede(1225   ,2907  ,181     ,24, 1225   ,2907),
        new Parede(1427   ,2907  ,218     ,24, 1427   ,2907),
        new Parede(1731   ,2907  ,213     ,24, 1731   ,2907),
        new Parede(2030   ,2907  ,251     ,24, 2030   ,2907),
        new Parede(2365   ,2907  ,229     ,24, 2365   ,2907),
        new Parede(2679   ,2907  ,76      ,24, 2679   ,2907),
        new Parede(3042   ,2907  ,68      ,24, 3042   ,2907),
        new Parede(3145   ,2907  ,207     ,24, 3145   ,2907),
        new Parede(3487   ,2907  ,176     ,24, 3487   ,2907),
        new Parede(1828   ,2907  ,24      ,402, 1828   ,2907),
        new Parede(2080   ,2907  ,24      ,402, 2080   ,2907),
        new Parede(2406   ,2907  ,24      ,402, 2406   ,2907),
        new Parede(2731   ,2907  ,24      ,402, 2731   ,2907),
        new Parede(3042   ,2907  ,24      ,402, 3042   ,2907),
        new Parede(3334   ,2907  ,24      ,402, 3334   ,2907),
        new Parede(3637   ,2907  ,24      ,402, 3637   ,2907),
        new Parede(2626   ,2337  ,24      ,406, 2626   ,2337),
        new Parede(3031   ,2337  ,24      ,406, 3031   ,2337),
        new Parede(3333   ,2337  ,24      ,406, 3333   ,2337),
        new Parede(3638   ,2856  ,24      ,2144, 3638   ,2856),
        new Parede(3638   ,2150  ,24      ,561, 3638   ,2150),
        new Parede(3638   ,1828  ,24      ,233, 3638   ,1828),
        new Parede(3333   ,1828  ,330     ,24, 3333   ,1828),
        new Parede(3333   ,1828  ,24      ,831, 3333   ,1828),
        new Parede(1207   ,2355  ,361     ,72, 1207   ,2355),
        new Parede(1688   ,2660  ,270     ,46, 1688   ,2660),
        new Parede(2250   ,2440  ,377     ,62, 2250   ,2440),
        new Parede(2099   ,2440  ,62      ,192, 2099   ,2440),
        new Parede(971    ,2652  ,76      ,651, 971    ,2652),
        new Parede(1560   ,3030  ,200     ,200, 1560   ,3030),
        new Parede(1851   ,2930  ,57      ,33, 1851   ,2930),
        new Parede(2649   ,2258  ,227     ,169, 2649   ,2258),
        new Parede(3455   ,1938  ,70      ,300, 3455   ,1938),
        new Parede(1999   ,1684  ,170     ,170, 1999   ,1684),
        new Parede(493    ,1854  ,310     ,310, 493    ,1854),
        new Parede(1167   ,4128  ,220     ,420, 1167   ,4128),
        new Parede(3861   ,2194  ,70      ,265, 3861   ,2194),
        new Parede(1562   ,2194  ,70      ,265, 1562   ,2194),
        new Parede(1036   ,2194  ,70      ,265, 1036   ,2194),
        new Parede(4030   ,595   ,265     ,70, 4030   ,595 ),
        new Parede(4555   ,595   ,265     ,70, 4555   ,595 ),
        new Parede(3920   ,600   ,82      ,62, 3920   ,600 ),
    ];
    for(var i = 0; i < 100; i++){
        var x = Math.floor((Math.random() * 5000) + 1);
        var y = Math.floor((Math.random() * 2500) + 1);
        var zombi = new Inimigo(x,y,77,77,img.vamp,0,0);
        vampiros.push(zombi);
    };
    
    function ZombiParedes(nPassara,quemQuerPassar){
        nPassara.forEach(function(umaParede){
            /*global mataZombi*/
            bloqueia(quemQuerPassar,umaParede);
            //console.log(umaParede.pontoX +"-" + umaParede.pontoY);
        });
    }

//  ====================================================================================================================
//  ELEMENTOS PRINCIPAIS ===============================================================================================
    
    var mundoDoGame = new Mapa(0, 0, 5000, 5000, img.sec, true);
    var player      = new Personagem(1447,4254,96,53,img.playerPatrick,0,0);
    var camera = new Camera(0,0,canvas.width,canvas.height);

    //nPassara.push(parTeste); 
    
//  ====================================================================================================================    
    camera.pontoX = (mundoDoGame.largura - camera.largura)/2;
	camera.pontoY = (mundoDoGame.altura - camera.altura)/2;
	
	player.pontoX = 1447;
	player.pontoY = 4254;
//  ====================================================================================================================	
//  ELEMENTOS DE MOVIMENTAÇÃO DO JOGADOR ===============================================================================

    var moveEsquerda, moveCima, moveDireita, moveBaixo, cooldownDoSpaco  = false;
    
    window.addEventListener("keydown",function(tecla){movimento(tecla, true)});
    window.addEventListener("keyup", function(tecla) {movimento(tecla, false);player.corteX = 0;});
   
    function movimento(tecla,boleano){
    // Esta função é chamada quando alguma tecla é pressionada ou solta, ela recebe o objeto 
    // tecla e o boleano que executa o decremento ou incremento dos eixos x e y criando a 
    // movimentação do elemento. O keyCode é equivalente a um código com ele faço a comparação 
    // em sentido horário.
            
        switch (tecla.keyCode){
            case 37:
                moveEsquerda = boleano, player.direcao = "Esquerda";
                break;
            case 38:
                moveCima     = boleano, player.direcao = "Cima";
                break;
            case 39:
                moveDireita  = boleano, player.direcao = "Direita";
                break;
            case 40:
                moveBaixo    = boleano, player.direcao = "Baixo";
                break;
            case 32:
                if(cooldownDoSpaco == boleano ){
                    player.disparar(disparos);
                    cooldownDoSpaco == boleano;
                }
                break;
        }
    };
            
    function atualizaPosicaoDoPlayer(){
        if(moveEsquerda && !moveDireita && !moveCima && !moveBaixo){
            player.atualizaSprite(53,96,53);
            player.pontoX = player.pontoX - 7; 
            player.moveSprite();
        }
        
        if(moveCima && !moveBaixo && !moveDireita && !moveEsquerda){
            player.atualizaSprite(96,53,106);
            player.pontoY = player.pontoY - 7;
            player.moveSprite();
        }
        
        if(moveDireita && !moveEsquerda && !moveBaixo && !moveCima) {
            player.atualizaSprite(53,96,0);
            player.pontoX = player.pontoX + 7; 
            player.moveSprite();    
        }
        
        if(moveBaixo && !moveEsquerda && !moveCima && !moveDireita){
            player.atualizaSprite(96,53,202);
            player.pontoY = player.pontoY + 7; 
            player.moveSprite();    
        }

    }
    //Coisas a se pensar...
    function atualizaPosicaoDisparo(){
        disparos = disparos.filter(function(disparo){
           return   disparo.pontoX - 300 < player.pontoX && disparo.direcao == "Direita"    || disparo.pontoX + 300 > player.pontoX && disparo.direcao == "Esquerda"   || disparo.pontoY - 300 < player.pontoY && disparo.direcao == "Baixo"      || disparo.pontoY + 300 > player.pontoY && disparo.direcao == "Cima"   
        });
        disparos.forEach(function(disparo){
            if(disparo.direcao == "Esquerda") { disparo.pontoX -= 30;}
            if(disparo.direcao == "Direita")  { disparo.pontoX += 30;}
            if(disparo.direcao == "Cima")     { disparo.pontoY -= 30;}
            if(disparo.direcao == "Baixo")    { disparo.pontoY += 30;}
        }); 
    }
    //======================================================================================================
    
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        atualiza();
        renderiza();
    }
    function atualiza(){
        vampiros = vampiros.filter(function(elemento){
            return elemento.vivo;
        });
        player.vida < 300 ? stringDaVida = "PATRICK + + +" : stringDaVida;
        player.vida < 200 ? stringDaVida = "PATRICK + +" : stringDaVida;
        player.vida < 100 ? stringDaVida = "PATRICK +" : stringDaVida;
        
        // Executa todas as inteções que o Zombi possui.
        vampiros.forEach(function(zombi){
             var distanciaAtualX = zombi.pontoCentralX() - player.pontoCentralX();
             var distanciaAtualY = zombi.pontoCentralY() - player.pontoCentralY();
             zombi.seguir(player.pontoX,player.pontoY); 
            
            // Essa funcao eh doida.
            zombi.naoMeToque(zombi,vampiros);
            dano(zombi,player);
            //o Q VAI SER BLOQUEADO E O QUE BLOQUEIA
            ZombiParedes(nPassara,zombi);
            zombi.levarUmTiro(zombi,disparos,vestijos,corpos,player);
        });
    
        //bloqueia(player,parTeste);
        
        atualizaPosicaoDoPlayer();  // Atualiza a posição do jogador.
        camera.atualizaPosicao(player);  // Atualiza a posição da camera.
        atualizaPosicaoDisparo();
        ZombiParedes(nPassara,player);
        
        //  LIMITES ==================================================================================
        //  Para a implementação da limitação do mundo que criei, tive que fazer o uso de duas funções
        //  simples por indicação de um grande amigo meu, com elas faço o uso da recursividade, já que
        //  ambas rebem dois valores uma devolve o maior e a outra o menor.
        //
            camera.pontoX = Math.max(0,Math.min(mundoDoGame.largura - camera.largura, camera.pontoX));
            camera.pontoY = Math.max(0,Math.min(mundoDoGame.altura - camera.altura, camera.pontoY));
            
            player.pontoX = Math.max(0,Math.min(mundoDoGame.largura - player.largura, player.pontoX));
            player.pontoY = Math.max(0,Math.min(mundoDoGame.altura - player.altura, player.pontoY));
            
            //Verificando se acertou o tiro..
            
            /*global bloqueia*/
            
            
            
    }
    
        
    //===================================================================================================
    function renderiza(){
        contexto.clearRect(0,0,canvas.width,canvas.height); // Para limpar a tela depois de cada atualização..
        contexto.save();
        contexto.translate(-camera.pontoX, -camera.pontoY);
        
        contexto.drawImage(mundoDoGame.img, 0, 0, mundoDoGame.largura, mundoDoGame.altura, mundoDoGame.pontoX, mundoDoGame.pontoY, mundoDoGame.largura, mundoDoGame.altura);
        vestijos.forEach(function(e){
            //contexto.fillStyle="red";
            contexto.drawImage(e.img, e.corteX, e.corteY, e.largura, e.altura, e.pontoX, e.pontoY, e.largura, e.altura);   
        });
//        corpos.forEach(function(e){
            //contexto.fillStyle="red";
          //  contexto.drawImage(e.img, e.corteX, e.corteY, e.largura, e.altura, e.pontoX, e.pontoY, e.largura, e.altura);   
//        });
        disparos.forEach(function(e){
            contexto.fillStyle="#ffe700";
            contexto.fillRect(e.pontoX, e.pontoY, e.largura, e.altura);      
        });
        vampiros.forEach(function(e){
            contexto.drawImage(e.img, e.corteX, e.corteY, e.largura, e.altura, e.pontoX, e.pontoY, e.largura, e.altura);    
        });

        
        
       
        contexto.drawImage(player.img, player.corteX, player.corteY, player.largura, player.altura, player.pontoX, player.pontoY, player.largura, player.altura);    
           
        /*TEM UMA IDEIA 51 PRA ISSO AQUI MAIS DEPOIS EU VOU COLOCAR*/
        contexto.restore();
        // AQUI POSSO DEIXAR COISAS FIXAS.. AGORA AINDA NÃO MAN
        contexto.fillStyle = "black";
       
        contexto.fillRect(canvas.width - 202, 10, 200, 30);
        contexto.fillRect(canvas.width - 302, 45, 300, 50);
        
        contexto.fillStyle = "white";
        
       
        contexto.textAlign = "right";
        
        
        
        contexto.textAlign = "right";
            // var gradient = contexto.createLinearGradient(0, 0, canvas.width, 0);
            // gradient.addColorStop("0", "magenta");
            // gradient.addColorStop("0.5", "blue");
            // gradient.addColorStop("1.0", "red");
            // Fill with gradient
            //contexto.fillStyle = gradient;
            
            contexto.font="22px VT323";
            contexto.fillText(stringDaVida, canvas.width - 25, 30);
            contexto.font="60px VT323";
            contexto.fillText("HITS "+ player.score, canvas.width - 20, 85);
        
        //contexto.font="20px VT323";
        //contexto.fillText("PATRICK * * * *", canvas.width - 180, 85);
        
        
        //contexto.font="20px VT323";
        //contexto.fillText("PONTOS "+ player.score, canvas.width - 280, 45);
        
        // contexto.drawImage(background, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
        // contexto desenhe nomeDaImage, ondeElaComeça x e y, tamanhoDaImagem,
        // Blind Guardian Wacken muito boa a musicagi
    }
    loop();
}
// Chek de load img 
function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        
        for(var src in sources) {
          numImages++;
        }
        console.log(sources);
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
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

var img={
        sec:"../img/background.jpg",
        playerPatrick:"../img/player-patrick.png",
        vamp: "../img/inimigo-vampiro.png",
        vestijo: "../img/inimigo-vestijo.png",
        cadaver: "../img/cadaver.png"
    };


  
  function start(){
      //var tela = document.getElementById("telaDoJogo");
      //tela.height = window.innerHeight/1.7;
      //tela.width = window.innerWidth;
       loadImages(img, function() {
            main();
        });
  }
  function telaLoading(passo){
    var canvas = document.getElementById("telaDoJogo");
    var contexto = canvas.getContext("2d")
    contexto.clearRect(0,0,canvas.width,canvas.height);
    contexto.font = "60px VT323";
    contexto.fillStyle = "white";
    contexto.fillText("LOADING... "+ passo +"%", canvas.width/2.8, canvas.height/2);
  }