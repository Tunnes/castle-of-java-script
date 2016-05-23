function main(){
// =========================================================================
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
    var vampiros     = [];
    var vestijos     = [];
    var stringDaVida = "PATRICK + + + +";
    var nPassara     = [];  
//  ====================================================================================================================
//  ELEMENTOS PRINCIPAIS ===============================================================================================
    
    var mundoDoGame = new Mapa(0, 0, 2500, 2500, "../img/primeira.jpg", true);
    var player      = new Personagem(0,0,96,52,"../img/player-patrick.png",0,0);
    var camera = new Camera(0,0,canvas.width,canvas.height);
    
    var vampiro1 = new Inimigo(300,500,77,77,"../img/inimigo-vampiro.png",0,0);    
    
    var vampiro2 = new Inimigo(400,600,77,77,"../img/inimigo-vampiro.png",0,0);
   
    var parTeste = new Parede(386,588,24,1082,386,588);
     
    //nPassara.push(parTeste);
    
    vampiros.push(vampiro1,vampiro2);
    
//  ====================================================================================================================    
    camera.pontoX = (mundoDoGame.largura - camera.largura)/2;
	camera.pontoY = (mundoDoGame.altura - camera.altura)/2;
	
	player.pontoX = (mundoDoGame.largura - player.largura)/2;
	player.pontoY = (mundoDoGame.altura - player.altura)/2;
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
            player.pontoX = player.pontoX - 5; 
            player.moveSprite();
        }
        
        if(moveCima && !moveBaixo && !moveDireita && !moveEsquerda){
            player.atualizaSprite(96,53,106);
            player.pontoY = player.pontoY - 5;
            player.moveSprite();
        }
        
        if(moveDireita && !moveEsquerda && !moveBaixo && !moveCima) {
            player.atualizaSprite(53,96,0);
            player.pontoX = player.pontoX + 5; 
            player.moveSprite();    
        }
        
        if(moveBaixo && !moveEsquerda && !moveCima && !moveDireita){
            player.atualizaSprite(96,53,202);
            player.pontoY = player.pontoY + 5; 
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
            zombi.seguir(player.pontoX,player.pontoY);
            // Essa funcao eh doida.
            zombi.naoMeToque(zombi,vampiros);
            dano(zombi,player);
            //o Q VAI SER BLOQUEADO E O QUE BLOQUEIA
            bloqueia(zombi,parTeste);
            zombi.levarUmTiro(zombi,disparos,vestijos, player);
        });
    
        bloqueia(player,parTeste);
        
        atualizaPosicaoDoPlayer();  // Atualiza a posição do jogador.
        camera.atualizaPosicao(player);  // Atualiza a posição da camera.
        atualizaPosicaoDisparo();
        
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