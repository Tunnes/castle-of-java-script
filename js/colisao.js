//  IMPORTANTE: 
//  Esta função que me deu mais dor de cabeça pois é a mais complexa e mesmo com o auxilio
//  de amigos, sites relacionados e outros eu só consegui entender e implementa-la pois 
//  segui a logica matematica de um video relativo a colisoes com Js, então a logica desta 
//  função não  é de total autoria minha, apenas a entendi e adaptei segundo as necessidade 
//  de construção do game, logo agradeço ao Desenvolvedor e Professor Gustavo Silveira.

//  Bom dentro desta "classe" estão as principais funções relativas ao acotencimento de colisões
//  no decorrer do game, para isso tive que relembrar o funcionamento basico de catetos e adaptar
//  minha "classe" de sprites para faciliar o calculo.

/*global Vestijo, Cadaver*/

//  FUNCÃO BLOQUEIA =========================================================================================
    // A função bloqueia recebe dois elementos e faz com que o elemento01 seja efetivamente bloqueado 
    // pelo elemento02.
    
    function bloqueia(elemento01,elemento02){
        
        //  As variaveis "distanciaAtualX" e "distanciaAtualY" armazena a distancia entre os centros X e Y
        //  de ambos os elementos ou seja qual a distancia que um elemento esta do outro.
        var distanciaAtualX = elemento01.pontoCentralX() - elemento02.pontoCentralX();
        var distanciaAtualY = elemento01.pontoCentralY() - elemento02.pontoCentralY();
        
        // As variaveis "distanciaMinimaX" e "distanciaMinimaY" armazenam as distancias minima
        // que os elementos poram chegar sem se colidirem.
        var distanciaMinimaX = elemento01.metadeDaLargura() + elemento02.metadeDaLargura();
        var distanciaMinimaY = elemento01.metadeDaAltura()  + elemento02.metadeDaAltura();
        
        // Verifico se a distancia atual dos dois elementos é menor que a distancia minima permitida,
        // a função Math.abs ela retorna o parametro enviado como valor absoluto ou seja se estiver 
        // negativo vira positivo.
        
        
        
        if( Math.abs(distanciaAtualX) < distanciaMinimaX && Math.abs(distanciaAtualY) < distanciaMinimaY){
            // As variaveis ultrapassagemX e ultrapassagemY, elas recebem a quantidade de pixels que  
            // foram ultrapassadas no momento de colissão nos eixos x e y.
            var ultrapassagemX = distanciaMinimaX - Math.abs(distanciaAtualX);
            var ultrapassagemY = distanciaMinimaY - Math.abs(distanciaAtualY);
                    
            if(ultrapassagemX >= ultrapassagemY){
                if(distanciaAtualY > 0){ elemento01.pontoY += ultrapassagemY;}
                if(distanciaAtualY < 0){ elemento01.pontoY -= ultrapassagemY;}    
            }else{
                if(distanciaAtualX > 0){ elemento01.pontoX += ultrapassagemX;}
                if(distanciaAtualX < 0){ elemento01.pontoX -= ultrapassagemX;} 
            }
        }
    }
    
// PONTOS ----------------------------------------------------------------------------------------------------------------------
function mataZombi(zombi, tiro, player,vestijos, disparos){
    var zombiVivo  = function(){
        var random  = Math.floor((Math.random() * 10));
        var pontoX  = zombi.pontoCentralX() + random; 
        var pontoY  = zombi.pontoCentralY() + random;
        var corteX  = [0,30,60,90,120,150,180,210,240,270];
        var vestijo = new Vestijo(pontoX, pontoY, corteX[random]);
            vestijos.push(vestijo);
            disparos.pop();
            zombi.vida -= 1;
    }
    var distanciaAtualX  = zombi.pontoCentralX()   - tiro.pontoCentralX();
    var distanciaAtualY  = zombi.pontoCentralY()   - tiro.pontoCentralY();
    var distanciaMinimaX = zombi.metadeDaLargura() + tiro.metadeDaLargura();
    var distanciaMinimaY = zombi.metadeDaAltura()  + tiro.metadeDaAltura();
        
    if( Math.abs(distanciaAtualX) < distanciaMinimaX && Math.abs(distanciaAtualY) < distanciaMinimaY){
        player.score  += 1;
        zombi.vida > 0 ? zombiVivo() : zombi.vivo = false;
    }
}

// teste
function dano(elemento01,elemento02){
        
        //  As variaveis "distanciaAtualX" e "distanciaAtualY" armazena a distancia entre os centros X e Y
        //  de ambos os elementos ou seja qual a distancia que um elemento esta do outro.
        var distanciaAtualX = elemento01.pontoCentralX() - elemento02.pontoCentralX();
        var distanciaAtualY = elemento01.pontoCentralY() - elemento02.pontoCentralY();
        
        // As variaveis "distanciaMinimaX" e "distanciaMinimaY" armazenam as distancias minima
        // que os elementos poram chegar sem se colidirem.
        var distanciaMinimaX = elemento01.metadeDaLargura() + elemento02.metadeDaLargura();
        var distanciaMinimaY = elemento01.metadeDaAltura()  + elemento02.metadeDaAltura();
        
        // Verifico se a distancia atual dos dois elementos é menor que a distancia minima permitida,
        // a função Math.abs ela retorna o parametro enviado como valor absoluto ou seja se estiver 
        // negativo vira positivo.
        
        
        
        if( Math.abs(distanciaAtualX) < distanciaMinimaX && Math.abs(distanciaAtualY) < distanciaMinimaY){
            elemento02.vida -= 1;
            // As variaveis ultrapassagemX e ultrapassagemY, elas recebem a quantidade de pixels que  
            // foram ultrapassadas no momento de colissão nos eixos x e y.
            var ultrapassagemX = distanciaMinimaX - Math.abs(distanciaAtualX);
            var ultrapassagemY = distanciaMinimaY - Math.abs(distanciaAtualY);
                    
            if(ultrapassagemX >= ultrapassagemY){
                if(distanciaAtualY > 0){ elemento01.pontoY += ultrapassagemY;}
                if(distanciaAtualY < 0){ elemento01.pontoY -= ultrapassagemY;}    
            }else{
                if(distanciaAtualX > 0){ elemento01.pontoX += ultrapassagemX;}
                if(distanciaAtualX < 0){ elemento01.pontoX -= ultrapassagemX;} 
            }
        }
    }
    
// Colisão com Pixels ======================================================================================================
function colisaoPorPixel(elemento, camadaColisao){

    function corPreta(){
        var cordX, cordY, cor;
        
        switch (elemento.direcao){
            case 'Direita':
                var cor   = camadaColisao.getImageData(elemento.pontoX + elemento.largura, elemento.pontoY + 35, elemento.largura, elemento.altura); 
                break;
            case 'Esquerda':
                var cor   = camadaColisao.getImageData(elemento.pontoX, elemento.pontoY + 35, elemento.largura, elemento.altura);
                
                break;
            case 'Baixo':
                var cor   = camadaColisao.getImageData(elemento.pontoX + 30, elemento.pontoY + elemento.altura, elemento.altura, elemento.largura);
                break;
            case 'Cima':
                var cor   = camadaColisao.getImageData(elemento.pontoX + 30, elemento.pontoY, elemento.largura, elemento.altura);
                break;
            
            
        }
        var affs  = camadaColisao.getImageData(elemento.pontoCentralX(), elemento.pontoCentralY(),50,50);
       // console.log(cor.data[0]);
        return cor.data[0] > 20 || affs.data[0] > 20;
        // Só criar uma imagem diferente.
    }
    function colisao(){
        switch (elemento.direcao) {
            case "Direita":
                elemento.pontoX -= 5;
            break;
            case "Esquerda":
                elemento.pontoX += 5;
            break;
            case "Cima":
                elemento.pontoY += 5;
            break;
            case "Baixo":
                elemento.pontoY -= 5;
            break;
        }
    }
    corPreta() ? colisao() : null
    
}
 