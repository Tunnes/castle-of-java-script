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
        Personagem.prototype.metadeDaLargura = function(){
            return this.largura/2;        
        }
        Personagem.prototype.metadeDaAltura = function(){
            return this.altura/2;
        }
        Personagem.prototype.pontoCentralX = function(){
            return this.pontoX + this.metadeDaLargura();
        }
        Personagem.prototype.pontoCentralY = function(){
            return this.pontoY + this.metadeDaAltura();
        }
        Personagem.prototype.atualizaSprite = function(altura,largura,corteY){
            return this.altura = altura, this.largura = largura, this.corteY = corteY; 
        }
        Personagem.prototype.moveSprite = function(){
            if(this.frameAtual == this.frame){
                this.corteX == this.largura*7 ? this.corteX = 0 : this.corteX += this.largura;    
                this.frameAtual = 0;
            }else{
                this.frameAtual += 1;
            }
        }

        
//  =============================================================================================================
//  MAPA ======================================================================================================== 
    function mapa(pontoX, pontoY, largura, altura, enderecoImagem, visivel){
        this.pontoX     = pontoX;
        this.pontoY     = pontoY;
        this.largura    = largura;
        this.altura     = altura;
        this.img        = new Image();
        this.img.src    = enderecoImagem;
        this.visivel    = visivel || true;
    }
//  =============================================================================================================
//  CAMERA ======================================================================================================//  PAREDE ===================================================================================================
    var Parede = function(pontoX, pontoY, largura, altura, cor, visivel){             
        this.pontoX  = pontoX;
        this.pontoY  = pontoY;
        this.largura = largura;
        this.altura  = altura;
        this.cor     = cor;
        this.visivel = visivel || true;
    }
        Parede.prototype.metadeDaLargura = function(){
            return this.largura/2;
        }
        Parede.prototype.metadeDaAltura = function(){
            return this.altura/2;
        }
        Parede.prototype.pontoCentralX = function(){
            return this.pontoX + this.metadeDaLargura();
        }
        Parede.prototype.pontoCentralY = function(){
            return this.pontoY + this.metadeDaAltura();
        }
//  ==========================================================================================================
//  MAPA ======================================================================================================== 
    function mapa(pontoX, pontoY, largura, altura, enderecoImagem, visivel){
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