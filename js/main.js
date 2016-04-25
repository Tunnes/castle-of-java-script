function main(){
    // Função main é a função de motor do game, nela mandarei quase todas as funções.
    var canvasAltura  = parseInt(document.getElementById("telaDoJogo").style.width); 
    var canvasLargura = parseInt(document.getElementById("telaDoJogo").style.height);
    
    var canvas   = document.getElementById("telaDoJogo");
    // Variavel de contexto de renderização
    var contexto = canvas.getContext("2d");
    
    //Recursos do Game
    var background = new Image();
    background.src = "../img/imgDeFundo.jpg";
    
    //Objetos
    var sprites = [];
    var mundoDoGame = {
      img: background,
      x: 0,
      y: 0,
      width: 1920,
      height: 1080
    };
    
    sprites.push(mundoDoGame);
    
    var camera = {
        x: 0,
        y: 0,
        width:  canvas.width,
        height: canvas.height,
        
        frontDireita:   function (){ return this.x + this.width * 0.25 },
        frontEsquerda:  function (){ return this.x + this.width * 0.75 },
        frontAlto:      function (){ return this.x + this.height * 0.25 },
        frontBaixo:     function (){ return this.x + this.height * 0.75 }
        
    };
    
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        atualiza();
        renderiza();
    }
    function atualiza(){}
    function renderiza(){
        contexto.save();
        contexto.translate(-camera.x, -camera.y);
        for(var i in sprites){
            var spr = sprites[i];
            contexto.drawImage(spr.img, 0, 0, spr.width, spr.height, spr.x, spr.y, spr.width, spr.height);
        }
        contexto.restore();
        
        // contexto.drawImage(background, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
        // contexto desenhe nomeDaImage, ondeElaComeça x e y, tamanhoDaImagem,  
    }
    loop();
}