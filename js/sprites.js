//  PERSONAGEM =============================================================================================== 
var Personagem = function(pontoX, pontoY, largura, altura, enderecoImagem, corteX, corteY){
    this.pontoX     = pontoX;
    this.pontoY     = pontoY;
    this.largura    = largura;
    this.altura     = altura;
    this.img        = new Image(); 
    this.img.src    = enderecoImagem;
    this.corteX     = corteX;
    this.corteY     = corteY; 
    this.frame      =  4;
    this.frameAtual =  0;
    }    
    Personagem.prototype.metadeDaLargura    = function(){ return this.largura/2;    }
    Personagem.prototype.metadeDaAltura     = function(){ return this.altura/2;     }
    Personagem.prototype.pontoCentralX      = function(){ return this.pontoX + this.metadeDaLargura();  }
    Personagem.prototype.pontoCentralY      = function(){ return this.pontoY + this.metadeDaAltura();   }

    Personagem.prototype.atualizaSprite     = function(altura,largura,corteY){
        return this.altura = altura, this.largura = largura, this.corteY = corteY; 
    }
    Personagem.prototype.moveSprite = function(){
        if (this.frameAtual == this.frame){
            this.corteX == this.largura*7 ? this.corteX = 0 : this.corteX += this.largura;    
            this.frameAtual = 0;
        }else{ 
            this.frameAtual++;
        }
    }
        
//  MAPA ======================================================================================================== 
var Mapa = function (pontoX, pontoY, largura, altura, enderecoImagem, visivel){
        this.pontoX     = pontoX;
        this.pontoY     = pontoY;
        this.largura    = largura;
        this.altura     = altura;
        this.img        = new Image();
        this.img.src    = enderecoImagem;
        this.visivel    = visivel || true;
    }
//  =============================================================================================================
//  CAMERA ======================================================================================================
var Camera = function(pontoX, pontoY, largura, altura){             
        this.pontoX  = pontoX;
        this.pontoY  = pontoY;
        this.largura = largura;
        this.altura  = altura;
    }
    Camera.prototype.fronteiraEsquerda  = function (){ return this.pontoX + (this.largura * 0.25);  }
    Camera.prototype.fronteiraAlto      = function (){ return this.pontoY + (this.altura * 0.25);   }
    Camera.prototype.fronteiraDireita   = function (){ return this.pontoX + (this.largura * 0.75);  }
    Camera.prototype.fronteiraBaixo     = function (){ return this.pontoY + (this.altura * 0.75);   }
    
    Camera.prototype.atualizaPosicao    = function(player){
        if(player.pontoX < this.fronteiraEsquerda())                 { this.pontoX = player.pontoX - (this.largura * 0.25);                 }
        if(player.pontoY < this.fronteiraAlto())                     { this.pontoY = player.pontoY - (this.altura * 0.25);                  }
        if(player.pontoX + player.largura > this.fronteiraDireita()) { this.pontoX = player.pontoX + player.largura - (this.largura * 0.75);}
        if(player.pontoY + player.altura > this.fronteiraBaixo())    { this.pontoY = player.pontoY + player.altura - (this.altura * 0.75);  }
    }

//  ==========================================================================================================
//  PERSONAGEM =============================================================================================== 
var Inimigo = function(pontoX, pontoY, largura, altura, enderecoImagem, corteX, corteY){
    this.pontoX     = pontoX;
    this.pontoY     = pontoY;
    this.largura    = largura;
    this.altura     = altura;
    this.img        = new Image(); 
    this.img.src    = enderecoImagem;
    this.corteX     = corteX;
    this.corteY     = corteY; 
    this.frame      =  10;
    this.frameAtual =  0;
    }    
    Inimigo.prototype.metadeDaLargura    = function(){ return this.largura/2;    }
    Inimigo.prototype.metadeDaAltura     = function(){ return this.altura/2;     }
    Inimigo.prototype.pontoCentralX      = function(){ return this.pontoX + this.metadeDaLargura();  }
    Inimigo.prototype.pontoCentralY      = function(){ return this.pontoY + this.metadeDaAltura();   }

    Inimigo.prototype.seguir             = function(focoX,focoY){
        if(this.pontoX < focoX && this.pontoY < focoY){
            this.pontoX = this.pontoX + 2;
            this.pontoY = this.pontoY + 2;
            this.moveSprite();
        }else{
            if(this.pontoCentralX() < focoX){ this.pontoX = this.pontoX + 2; this.moveSprite();}
            if(this.pontoCentralY() < focoY){ this.pontoY = this.pontoY + 2; this.moveSprite();}
        }
        if(this.pontoX > focoX && this.pontoY > focoY){
            this.pontoX = this.pontoX - 2;
            this.pontoY = this.pontoY - 2;
            this.moveSprite();
        }else{
            if(this.pontoCentralX() > focoX){ this.pontoX = this.pontoX - 2; this.moveSprite();}
            if(this.pontoCentralY() > focoY){ this.pontoY = this.pontoY - 2; this.moveSprite();}
        }
    }
   
    
    Inimigo.prototype.moveSprite = function(){
       
        if (this.frameAtual == this.frame){
            
            this.corteX == this.largura*7 ? this.corteX = 0 : this.corteX += this.largura;    
            
            this.frameAtual = 0;
        }else{ 
            this.frameAtual++;
        }
    }
  