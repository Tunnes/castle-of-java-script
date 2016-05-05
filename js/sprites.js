//  Na classe "sprites.js" contive os padrões de diversos elementos para a criação de elementos 
//  presentes no game, uso pois o codigo fica mais enxuto e simples sendo que dentro destes moldes
//  fiz o uso de atributos e funções com o mesmo intuito.. De uma certa forma segue a ideia de uma
//  "classe" pai onde todos os outros elementos filhos iram ter os mesmos atributos.
//          Estou usando o prototype apenas para atribuir um metodo a parede, que não é bem uma ação porem
//          este retorno desse metodo sera muito util com o calculo de colisão.

//  PAREDE ===================================================================================================
    function parede(pontoX, pontoY, largura, altura, cor, visivel){             
        this.pontoX  = pontoX;
        this.pontoY  = pontoY;
        this.largura = largura;
        this.altura  = altura;
        this.cor     = cor;
        this.visivel = visivel || true;
    }
        parede.prototype.metadeDaLargura = function(){
            return this.largura/2;
        }
        parede.prototype.metadeDaAltura = function(){
            return this.altura/2;
        }
        parede.prototype.pontoCentralX = function(){
            return this.pontoX + this.metadeDaLargura();
        }
        parede.prototype.pontoCentralY = function(){
            return this.pontoY + this.metadeDaAltura();
        }
//  ==========================================================================================================
//  PERSONAGEM =============================================================================================== 
    function personagem(pontoX, pontoY, largura, altura, enderecoImagem, corteX, corteY){
        this.pontoX     = pontoX;
        this.pontoY     = pontoY;
        this.largura    = largura;
        this.altura     = altura;
        this.img        = new Image(); 
        this.img.src    = enderecoImagem;
        // Teste com sprites.
        this.corteX         = corteX;
        this.corteY         = corteX;  
        this.olharEsquerda  = false; 
        this.olharDireita   = false;
        this.olharCima      = false;
        this.olharBaixo     = false;
        this.contDeFrame    = 0;
        this.veloDeFrame    = 15;
        this.proxFrame      = 0;
        this.ultiFrame      = 90;
        this.pontoDeInicio  = {
             esquerda: 0,
             direita: 0,
             cima: 0,
             baixo: 0,
             y: 0,
        };
        
    }    
        personagem.prototype.metadeDaLargura = function(){
            return this.largura/2;        
        }
        personagem.prototype.metadeDaAltura = function(){
            return this.altura/2;
        }
        personagem.prototype.pontoCentralX = function(){
            return this.pontoX + this.metadeDaLargura();
        }
        personagem.prototype.pontoCentralY = function(){
            return this.pontoY + this.metadeDaAltura();
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
//  CAMERA ======================================================================================================