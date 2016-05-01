function main(){
//  FUNÇÕES GENÉRICAS ==========================================================================================
//  Foi necessario a utilização de funções genéricas pois o código esta extenso e repetitivo e 
//  eu não gosto disso...
//  Eric Pesquisar: https://github.com/raphamorim/origami.js/tree/master
//
        
    function atualizaPosicaoDaCamera(){
        if(player.pontoX < camera.frontEsquerda()){ 
            camera.pontoX = player.pontoX - (camera.largura * 0.25);}
        
        if(player.pontoX + player.largura > camera.frontDireita()){
            camera.pontoX = player.pontoX + player.largura - (camera.largura * 0.75);}
            
        if(player.pontoY < camera.frontAlto()){
            camera.pontoY = player.pontoY - (camera.altura * 0.25);}
            
        if(player.pontoY + player.altura > camera.frontBaixo()){
            camera.pontoY = player.pontoY + player.altura - (camera.altura * 0.75);}
    };
        
//  ===================================================================================================================
//  RECURSOS-DO-GAME===================================================================================================
//  Neste bloco estão os elementos que formam os recursos do game, como por exemplo o mapa, personagens e
//  inimigos, todos eles são armazenados "empilhados" em um vetor de objetos que futuramente sera renderizado.
//  Aqui também se encontram as principais variaveis como a variavel canvas que amazena o objeto canvas do DOM
//  e nosso contexto que é responsavel por dar vida a tela do canvas.. tipo tudo que você desenha nele e renderiza
//  sera exibido dentro do canvas lá no DOM.
    
    var canvas   = document.getElementById("telaDoJogo");   // Recebendo o objeto "canvas" do DOM.
    var contexto = canvas.getContext("2d");                 // Indica que o contexto do canvas será em Bidimensional.
    var sprites = [];                                       // Armazena todos os objetos a serem renderizados. 
        
//  ====================================================================================================================
//  ELEMENTOS PRINCIPAIS ===============================================================================================
    
    var mundoDoGame = new mapa(0, 0, 1920, 1080, "../img/imgDeFundo.jpg", true);
    var umOutroR    = new personagem(30,30,64,64,"../img/player.png");
    var player      = new personagem(0,0,64,64,"../img/player.png");
    
    sprites.push(mundoDoGame);
    sprites.push(player);
    sprites.push(umOutroR);
   
//  ====================================================================================================================    

    var camera = {
        pontoX: 0,
        pontoX: 0,
        largura:  canvas.width,
        altura: canvas.height,
        frontEsquerda:  function (){ return this.pontoX + (this.largura * 0.25); },
        frontAlto:      function (){ return this.pontoY + (this.altura * 0.25);},
        frontDireita:   function (){ return this.pontoX + (this.largura * 0.75); },
        frontBaixo:     function (){ return this.pontoY + (this.altura * 0.75);}
    };
    
    //centralizar a câmera
	camera.pontoX = (mundoDoGame.largura - camera.largura)/2;
	camera.pontoY = (mundoDoGame.altura - camera.altura)/2;
	//centralizar a câmera
	player.pontoX = (mundoDoGame.largura - player.largura)/2;
	player.pontoY = (mundoDoGame.altura - player.altura)/2;
	
    // ELEMENTOS DE MOVIMENTAÇÃO DO JOGADOR ===============================================================
    var moveEsquerda, moveCima, moveDireita, moveBaixo = false;
    
    window.addEventListener("keydown",function(tecla){movimento(tecla, true)});
    window.addEventListener("keyup", function(tecla) {movimento(tecla,false)});
    
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
                    moveCima = boleano;
                    break;
                case 39:
                    moveDireita = boleano;
                    break;
                case 40:
                    moveBaixo = boleano;
                    break;
            }
        };
        function atualizaPosicaoDoPlayer(){
            
            if(moveEsquerda && !moveDireita) { player.pontoX = player.pontoX - 20;}
            if(moveCima && !moveBaixo)       { player.pontoY = player.pontoY - 20;}
            if(moveDireita && !moveEsquerda) { player.pontoX = player.pontoX + 20;}
            if(moveBaixo && !moveCima)       { player.pontoY = player.pontoY + 20;}
        };
    //======================================================================================================
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        atualiza();
        renderiza();
    }
    function atualiza(){
        atualizaPosicaoDoPlayer();  // Atualiza a posição do jogador.
        atualizaPosicaoDaCamera();  // Atualiza a posição da camera.
        
        //  LIMITES ==================================================================================
        //  Para a implementação da limitação do mundo que criei, tive que fazer o uso de duas funções
        //  simples por indicação de um grande amigo meu, com elas faço o uso da recursividade, já que
        //  ambas rebem dois valores uma devolve o maior e a outra o menor.
        //
            camera.pontoX = Math.max(0,Math.min(mundoDoGame.largura - camera.largura, camera.pontoX));
            camera.pontoY = Math.max(0,Math.min(mundoDoGame.altura - camera.altura, camera.pontoY));
            
            player.pontoX = Math.max(0,Math.min(mundoDoGame.largura - player.largura, player.pontoX));
            player.pontoY = Math.max(0,Math.min(mundoDoGame.altura - player.altura, player.pontoY));
            
            bloqueia(player,umOutroR);
            
    }
    
    //===================================================================================================
    function renderiza(){
        contexto.clearRect(0,0,canvas.width,canvas.height); // Para limpar a tela depois de cada atualização..
        contexto.save();
        contexto.translate(-camera.pontoX, -camera.pontoY);
        
        for(var i in sprites){
            var spr = sprites[i];
            contexto.drawImage(spr.img, 0, 0, spr.largura, spr.altura, spr.pontoX, spr.pontoY, spr.largura, spr.altura);
        }
        contexto.restore();
        // AQUI POSSO DEIXAR COISAS FIXAS.. AGORA AINDA NÃO MAN
        
        // contexto.drawImage(background, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
        // contexto desenhe nomeDaImage, ondeElaComeça x e y, tamanhoDaImagem,  
    }
    loop();
}