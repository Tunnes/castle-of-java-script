function main(){
    //  FUNÇÕES-GENÉRICAS==========================================================================================
    //  Uso funções genéricas pois o código esta extenso e repetitivo e eu não gosto disso..
    //
        function movimento(tecla,boleano){
            // Esta função é chamada quando alguma tecla é pressionada ou solta, ela recebe o objeto tecla e o
            // boleano que executa o decremento ou incremento dos eixos x e y criando a movimentação do elemento.
            //      Obs¹: O keyCode é equivalente a um código com ele faço a comparação em sentido horário.
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
    //  =====================================================================================================
    
    // Função main é a função de motor do game, nela mandarei quase todas as funções.
    var canvasAltura  = parseInt(document.getElementById("telaDoJogo").style.width); 
    var canvasLargura = parseInt(document.getElementById("telaDoJogo").style.height);
    
    var canvas   = document.getElementById("telaDoJogo");
    // VARIAVEL PARA ARMAZENAMENTO DO CONTEXTO DE RENDERIZAÇÃO.
    var contexto = canvas.getContext("2d");
    
    //Recursos do Game
    var background = new Image();
    background.src = "../img/imgDeFundo.jpg";

    var player = new Image();
    player.src = "../img/player.png";
    
    //Objetos do game a serem renderizados.
    var sprites = [];
    var mundoDoGame = { 
      img: background,
      x: 0,
      y: 0,
      width: 1920,
      height: 1080
    };
    var char = {
        img: player,
        x: 0,
        y: 0,
        width: 64,
        height: 64
    };

    sprites.push(mundoDoGame);
    sprites.push(char);
   
    
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
	char.x = (mundoDoGame.width - char.width)/2;
	char.y = (mundoDoGame.height - char.height)/2;
	
    // ELEMENTOS DE MOVIMENTAÇÃO DO JOGADOR ===============================================================
    var moveEsquerda = false;
    var moveDireita  = false;
    var moveCima     = false;
    var moveBaixo    = false;
    window.addEventListener("keydown",function(tecla){movimento(tecla,true)});
    window.addEventListener("keyup", function(tecla){movimento(tecla,false)});
    
    //======================================================================================================
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        atualiza();
        renderiza();
    }
    function atualiza(){
        // TENHO QUE TENTAR DEIXAR ISSO MAIS LIMPO.. E TALVEZ FUNCIONAL ;)
        if(moveEsquerda && !moveDireita){
            char.x = char.x - 10;
        }
        if(moveCima && !moveBaixo){
            char.y = char.y - 10;
        }
        if(moveDireita && !moveEsquerda){
            char.x = char.x + 10;
        }
        if(moveBaixo && !moveCima){
            char.y = char.y + 10;
        }
    // ATUALIZAÇÃO DA CAMERA EM FUNÇÃO DO PLAYER.
        if(char.x < camera.frontEsquerda()){
            camera.x = char.x - (camera.width * 0.25); 
        }
        if(char.x + char.width > camera.frontDireita()){
            camera.x = char.x + char.width - (camera.width * 0.75); 
        }
        if(char.y < camera.frontAlto()){
            camera.y = char.y - (camera.height * 0.25); 
        }
        if(char.y + char.height > camera.frontBaixo()){
            camera.y = char.y + char.height - (camera.height * 0.75); 
        }
        
        // AQUI ESTOU IMPONDO OS LIMITES PRO SUREALISMO (AQUELE LANCE DAS IMAGENS REPLICADAS)
        // TIPO UM BORÃO NA TELA PRA ISSO VOU LIMITAR QUE A CAMERA E O PLAUER TRAPASSE O 
        // TAMANHO DO CANVAS..
        
        // Camera:
        if(camera.x < 0){
            camera.x = 0;
        }
        if(camera.x + camera.width > mundoDoGame.width){
            camera.x = mundoDoGame.width - camera.width;
        }
        if(camera.y < 0){
            camera.y = 0;
        }
        if(camera.y + camera.height > mundoDoGame.height){
            camera.y = mundoDoGame.height - camera.height;
        }
        // PERSONAGEM:
        if(char.x < 0){
            char.x = 0;
        }
        if(char.x + char.width > mundoDoGame.width){
            char.x = mundoDoGame.width - char.width;
        }
        if(char.y < 0){
            char.y = 0;
        }
        if(char.y + char.height > mundoDoGame.height){
            char.y = mundoDoGame.height - char.height;
        }
        
    }
    
    //===================================================================================================
    function renderiza(){
        contexto.save();
        contexto.translate(-camera.x, -camera.y);
        for(var i in sprites){
            var spr = sprites[i];
            contexto.drawImage(spr.img, 0, 0, spr.width, spr.height, spr.x, spr.y, spr.width, spr.height);
        }
        contexto.restore();
        // AQUI POSSO DEIXAR COISAS FIXAS.. AGORA AINDA NÃO MAN
        
        // contexto.drawImage(background, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
        // contexto desenhe nomeDaImage, ondeElaComeça x e y, tamanhoDaImagem,  
    }
    loop();
}