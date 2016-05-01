//  Na classe "sprites.js" contive os padrões de diversos elementos para a criação de elementos 
//  presentes no game, uso pois o codigo fica mais enxuto e simples sendo que dentro destes moldes
//  fiz o uso de atributos e funções com o mesmo intuito.. De uma certa forma segue a ideia de uma
//  "classe" pai onde todos os outros elementos filhos iram ter os mesmos atributos.

//  PAREDE ===================================================================================================
    function parede(pontoX, pontoY, largura, altura, cor, visivel){             
        this.pontoX  = pontoX;
        this.pontoY  = pontoY;
        this.largura = largura;
        this.altura  = altura;
        this.cor     = cor;
        this.visivel = visivel || true;
    }
        // Estou usando o prototype apenas para atribuir um metodo a parede, que não é bem uma ação porem
        // este retorno desse metodo sera muito util com o calculo de colisão.
        //
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
    function personagem(pontoX, pontoY, largura, altura, enderecoImagem){
        this.pontoX     = pontoX;
        this.pontoY     = pontoY;
        this.largura    = largura;
        this.altura     = altura;
        this.img        = new Image();
        this.img.src    = enderecoImagem;
        
        personagem.prototype.metadeDaLargura = function(){
            return this.largura/2;        
        }
        personagem.prototype.metadeDaAltura = function(){
            return this.altura/2;
        }
        personagem.prototype.pontoCenralX = function(){
            return this.pontoX + this.metadeDaLargura();
        }
        personagem.prototype.pontoCentralY = function(){
            return this.pontoY + this.metadeDaAltura();
        }
    }
   