function main(){
    //  FUNÇÕES GENÉRICAS ==========================================================================================
    //  Foi necessario a utilização de funções genéricas pois o código esta extenso e repetitivo e 
    //  eu não gosto disso...
    //  Eric Pesquisar: https://github.com/raphamorim/origami.js/tree/master
    //
        function movimento(tecla,boleano){
            // Esta função é chamada quando alguma tecla é pressionada ou solta, ela recebe o objeto 
            // tecla e o boleano que executa o decremento ou incremento dos eixos x e y criando a 
            // movimentação do elemento. O keyCode é equivalente a um código com ele faço a comparação 
            // em sentido horário.
            //
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
    //  ===========================================================================================================
    //  RECURSOS-DO-GAME===========================================================================================
    //  Neste bloco estão os elementos que formam os recursos do game, como por exemplo o mapa, personagens e
    //  inimigos, todos eles são armazenados "empilhados" em um vetor de objetos que futuramente sera renderizado.
    //  Aqui também se encontram as principais variaveis como a variavel canvas que amazena o objeto canvas do DOM
    //  e nosso contexto que é responsavel por dar vida a tela do canvas.. tipo tudo que você desenha nele e renderiza
    //  sera exibido dentro do canvas lá no DOM.
    
        var canvas   = document.getElementById("telaDoJogo");   // Recebendo o objeto "canvas" do DOM.
        var contexto = canvas.getContext("2d");                 // Indica que o contexto do canvas será em Bidimensional.
        var sprites = [];                                       // Armazena todos os objetos a serem renderizados. 
        
        var background = new Image();                           // Indica que background é um objeto imagem.  
            background.src = "../img/imgDeFundo.jpg";           // Seta o atributo scr no caminho.
        
        var apenasUmR = new Image();                               // Indica que player é um objeto imagem. 
            apenasUmR.src = "../img/player.png";                   // Seta o atributo scr no caminho.
    //        
    //  ===========================================================================================================
    
    //Objetos do game a serem renderizados.
    
    var mundoDoGame = { 
      img: background,
      x: 0,
      y: 0,
      width: 1920,
      height: 1080
    };
    
    var player = {
        img: apenasUmR,
        x: 0,
        y: 0,
        width: 64,
        height: 64
    };
    

    sprites.push(mundoDoGame);
    sprites.push(player);
   
    
    var camera = {
        x: 0,
        y: 0,
        width:  canvas.width,
        height: canvas.height,
        frontEsquerda:  function (){ return this.x + (this.width * 0.25); },
        frontAlto:      function (){ return this.y + (this.height * 0.25);},
        frontDireita:   function (){ return this.x + (this.width * 0.75); },
        frontBaixo:     function (){ return this.y + (this.height * 0.75);}
    };
    
    //centralizar a câmera
	camera.x = (mundoDoGame.width - camera.width)/2;
	camera.y = (mundoDoGame.height - camera.height)/2;
	//centralizar a câmera
	player.x = (mundoDoGame.width - player.width)/2;
	player.y = (mundoDoGame.height - player.height)/2;
	
    // ELEMENTOS DE MOVIMENTAÇÃO DO JOGADOR ===============================================================
    var moveEsquerda = false;
    var moveCima     = false;
    var moveDireita  = false;
    var moveBaixo    = false;
    window.addEventListener("keydown",function(tecla){movimento(tecla, true)});
    window.addEventListener("keyup", function(tecla) {movimento(tecla,false)});
    
    //======================================================================================================
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        atualiza();
        
        renderiza();
    }
    function atualiza(){
        // TENHO QUE TENTAR DEIXAR ISSO MAIS LIMPO.. E TALVEZ FUNCIONAL ;)
        if(moveEsquerda && !moveDireita){
            player.x = player.x - 20;
        }
        if(moveCima && !moveBaixo){
            player.y = player.y - 20;
        }
        if(moveDireita && !moveEsquerda){
            player.x = player.x + 20;
        }
        if(moveBaixo && !moveCima){
            player.y = player.y + 20;
        }
    // ATUALIZAÇÃO DA CAMERA EM FUNÇÃO DO PLAYER.
        if(player.x < camera.frontEsquerda()){
            camera.x = player.x - (camera.width * 0.25); 
        }
        if(player.x + player.width > camera.frontDireita()){
            camera.x = player.x + player.width - (camera.width * 0.75); 
        }
        if(player.y < camera.frontAlto()){
            camera.y = player.y - (camera.height * 0.25); 
        }
        if(player.y + player.height > camera.frontBaixo()){
            camera.y = player.y + player.height - (camera.height * 0.75); 
        }
        
        // AQUI ESTOU IMPONDO OS LIMITES PRO SUREALISMO (AQUELE LANCE DAS IMAGENS REPLICADAS)
        // TIPO UM BORÃO NA TELA PRA ISSO VOU LIMITAR QUE A CAMERA E O PLAUER TRAPASSE O 
        // TAMANHO DO CANVAS..
        // Limites teste
        
        //  LIMITES ==================================================================================
        //  Para a implementação da limitação do mundo que criei, tive que fazer o uso de duas funções
        //  simples por indicação de um grande amigo meu, com elas faço o uso da recursividade, já que
        //  ambas rebem dois valores uma devolve o maior e a outra o menor.
        //
            camera.x = Math.max(0,Math.min(mundoDoGame.width - camera.width, camera.x));
            camera.y = Math.max(0,Math.min(mundoDoGame.height - camera.height, camera.y));
            
            player.x = Math.max(0,Math.min(mundoDoGame.width - player.width, player.x));
            player.y = Math.max(0,Math.min(mundoDoGame.height - player.height, player.y));
        
        
    }
    
    //===================================================================================================
    function renderiza(){
        contexto.clearRect(0,0,canvas.width,canvas.height); // Para limpar a tela depois de cada atualização..
        contexto.save();
        contexto.translate(-camera.x, -camera.y);
        for(var i in sprites){
            var spr = sprites[i];
            contexto.drawImage(spr.img, 0, 0, spr.width, spr.height, spr.x, spr.y, spr.width, spr.height);
            contexto.fillRect(700,1000,50,50); // teste inicial com plataformas.
        }
        contexto.restore();
        // AQUI POSSO DEIXAR COISAS FIXAS.. AGORA AINDA NÃO MAN
        
        // contexto.drawImage(background, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
        // contexto desenhe nomeDaImage, ondeElaComeça x e y, tamanhoDaImagem,  
    }
    loop();
}