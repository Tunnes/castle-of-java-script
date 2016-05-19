function main(){
//  RECURSOS-DO-GAME===================================================================================================
//  Neste bloco estão os elementos que formam os recursos do game, como por exemplo o mapa, personagens e
//  inimigos, todos eles são armazenados "empilhados" em um vetor de objetos que futuramente sera renderizado.
//  Aqui também se encontram as principais variaveis como a variavel canvas que amazena o objeto canvas do DOM
//  e nosso contexto que é responsavel por dar vida a tela do canvas.. tipo tudo que você desenha nele e renderiza
//  sera exibido dentro do canvas lá no DOM.
    
    var canvas      = document.getElementById("telaDoJogo");   // Recebendo o objeto "canvas" do DOM.
    var contexto    = canvas.getContext("2d");                 // Indica que o contexto do canvas será em Bidimensional.
    var sprites     = [];                                       // Armazena todos os objetos a serem renderizados.
        
//  ====================================================================================================================
//  ELEMENTOS PRINCIPAIS ===============================================================================================
    
    var mundoDoGame = new Mapa(0, 0, 2500, 2500, "../img/primeira.jpg", true);
    var umOutroR    = new Personagem(300,500,17,20,"../img/min.png");
    var player      = new Personagem(0,0,96,52,"../img/player-patrick.png",0,0);
    var camera = new Camera(0,0,canvas.width,canvas.height);
        sprites.push(mundoDoGame);
        //sprites.push(player);
        sprites.push(umOutroR);
   
//  ====================================================================================================================    
    camera.pontoX = (mundoDoGame.largura - camera.largura)/2;
	camera.pontoY = (mundoDoGame.altura - camera.altura)/2;
	
	player.pontoX = (mundoDoGame.largura - player.largura)/2;
	player.pontoY = (mundoDoGame.altura - player.altura)/2;
//  ====================================================================================================================	
//  ELEMENTOS DE MOVIMENTAÇÃO DO JOGADOR ===============================================================================

    var moveEsquerda, moveCima, moveDireita, moveBaixo = false;
    
    window.addEventListener("keydown",function(tecla){movimento(tecla, true)});
    window.addEventListener("keyup", function(tecla) {movimento(tecla, false);player.corteX = 0;});
   
    function movimento(tecla,boleano){
    // Esta função é chamada quando alguma tecla é pressionada ou solta, ela recebe o objeto 
    // tecla e o boleano que executa o decremento ou incremento dos eixos x e y criando a 
    // movimentação do elemento. O keyCode é equivalente a um código com ele faço a comparação 
    // em sentido horário.
            
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
    };
    //======================================================================================================
    
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        atualiza();
        renderiza();
    }
    function atualiza(){
        
        atualizaPosicaoDoPlayer();  // Atualiza a posição do jogador.
        camera.atualizaPosicaoDaCamera(player);  // Atualiza a posição da camera.
        
        //  LIMITES ==================================================================================
        //  Para a implementação da limitação do mundo que criei, tive que fazer o uso de duas funções
        //  simples por indicação de um grande amigo meu, com elas faço o uso da recursividade, já que
        //  ambas rebem dois valores uma devolve o maior e a outra o menor.
        //
            camera.pontoX = Math.max(0,Math.min(mundoDoGame.largura - camera.largura, camera.pontoX));
            camera.pontoY = Math.max(0,Math.min(mundoDoGame.altura - camera.altura, camera.pontoY));
            
            player.pontoX = Math.max(0,Math.min(mundoDoGame.largura - player.largura, player.pontoX));
            player.pontoY = Math.max(0,Math.min(mundoDoGame.altura - player.altura, player.pontoY));
            
            /*global bloqueia*/
            bloqueia(umOutroR,player);
            
    }
    
        
    //===================================================================================================
    function renderiza(){
        contexto.clearRect(0,0,canvas.width,canvas.height); // Para limpar a tela depois de cada atualização..
        contexto.save();
        contexto.translate(-camera.pontoX, -camera.pontoY);
        
        for(var i in sprites){
            var spr = sprites[i];
            
            
            contexto.drawImage(player.img, player.corteX, player.corteY, player.largura, player.altura, player.pontoX, player.pontoY, player.largura, player.altura);    
            contexto.drawImage(spr.img, 0, 0, spr.largura, spr.altura, spr.pontoX, spr.pontoY, spr.largura, spr.altura);
            
        }
        contexto.restore();
        // AQUI POSSO DEIXAR COISAS FIXAS.. AGORA AINDA NÃO MAN
        
        // contexto.drawImage(background, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
        // contexto desenhe nomeDaImage, ondeElaComeça x e y, tamanhoDaImagem,  
    }
    loop();
}